import '../Styles/User.css';
import React, { useState, useRef, useEffect } from 'react';
import { DataTable, DataTablePFSEvent, DataTableSelectionChangeParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ContextMenu } from 'primereact/contextmenu';
import { Button } from 'primereact/button';
import { PaginatorProps } from '../Interfaces/IMisc';
import { UserProps } from '../Interfaces/User';
import { Mask } from '../Helpers/Mask';
import { format } from 'date-fns'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Api } from '../Helpers/Api';

const DataTableUser = () => {
    const [user, setUser] = useState<UserProps>({ whatsapp: false });
    const toast = useRef<Toast>(null);
    const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
    const cm = useRef<ContextMenu>(null);
    const [loading, setLoading] = useState(false)
    const [selectAll, setSelectAll] = useState(false);
    const [userList, setUserList] = useState<Array<UserProps>>([]);
    /* Pagination */
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [paginator, setPaginator] = useState<PaginatorProps>({
        first: 0,
        rows: 10,
        page: 0,
        sortField: "createdAt",
        sortOrder: 1
    });

    /* Request AXIOS */
    useEffect(() => {
        setLoading(true);
        
        /* Request API */
        Api.request('GET', '/v1/user/list', { params: paginator }).then((response) => {
            if (response.data.users.length)
                setUserList(response.data.users);

            setTotalRecords(response.data.totalRecords); // pagination
            setLoading(false);
        }).catch((response) => {
            // "ERR_NETWORK"
            setLoading(false);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginator]);

    const onPage = (event: DataTablePFSEvent) => {
        setPaginator({
            first: event.first,
            rows: event.rows,
            page: event.page as number,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }

    const onSort = (event: DataTablePFSEvent) => {
        setPaginator({
            first: event.first,
            rows: event.rows,
            page: event.page as number,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }

    const onSelectionChange = (event: DataTableSelectionChangeParams) => {
        setSelectAll(false);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => setPaginator({ ...paginator })} />;

    const accountBodyTemplate = (rowData: UserProps) => {
        return (
            <React.Fragment>
                {rowData.enabled ? <Tag className='mr-2 enabled-tag' severity="success" value="ATIVA" /> : <Tag className='mr-2 disabled-tag' severity="danger" value="INATIVA" />}
                {rowData.admin ? <Tag className='mr-2 admin-tag' severity="info" value="ADMIN" /> : null}
            </React.Fragment>
        );
    }

    const contactBodyTemplate = (rowData: UserProps) => {
        /* Case Whatsapp true, color green items */
        return (
            <React.Fragment>
                {rowData.whatsapp ? <div className='pi mr-2 icon-whatsapp pi-whatsapp'></div> : <div className='pi mr-2 pi-phone'></div>}
                {rowData.whatsapp ? (<div >{Mask.phone(rowData.contact as string)}</div>) : Mask.phone(rowData.contact as string)}
            </React.Fragment>
        );
    }

    const dateBodyCreatedAt = (rowData: UserProps) => {
        return (
            <React.Fragment>
                {format(new Date(rowData.createdAt as string), 'HH:mm:ss dd/MM/yyyy')}
            </React.Fragment>
        );
    }

    const dateBodyUpdatedAt = (rowData: UserProps) => {
        return (format(new Date(rowData.createdAt as string), 'HH:mm:ss dd/MM/yyyy'));
    }

    const viewProduct = (user: UserProps) => {
        console.log(user)
    }

    const menuModel = [
        { label: 'Atualizar usuário', icon: 'pi pi-fw pi-refresh', command: () => viewProduct(user) },
        { label: 'Excluir usuário', icon: 'pi pi-fw pi-times', command: () => setVisibleDelete(true) }
    ];

    const confirmYesDelete = async () => {
        try {
            setLoading(true); // loading show
            /* Request API */
            const del = await Api.request('DELETE', '/v1/user/delete', { params: user });

            if (del.status === 202) {
                const index = userList.indexOf(user); // search user index by object
                delete userList[index] // remove user by index
                toast?.current?.show({ severity: 'success', summary: 'Sucesso', detail: del.data.message, life: 3000 });
            }
            setLoading(false); // loading hide
        } catch (error) {
            toast?.current?.show({ severity: 'error', summary: 'Erro inesperado!', detail: "Operação não realizada!", life: 3000 });
            setLoading(false); // loading hide
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <ContextMenu
                model={menuModel}
                ref={cm}
                onHide={console.log} />

            <div className="card">
                <ConfirmDialog
                    visible={visibleDelete}
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    onHide={() => setVisibleDelete(false)}
                    message="Tem certeza que deseja excluir este usuário?"
                    icon="pi red-700 pi-info-circle"
                    acceptClassName='p-button-danger'
                    accept={confirmYesDelete}
                    reject={() => setVisibleDelete(false)} />

                <DataTable
                    value={userList}
                    dataKey="id"
                    lazy={true}
                    selectionMode="single" // hover row show
                    rows={paginator.rows} // init count
                    rowsPerPageOptions={[10, 20, 50]} // select show count
                    totalRecords={totalRecords} // total rows
                    paginator={true} // show paginator
                    first={paginator.first}
                    paginatorLeft={paginatorLeft} // button refresh
                    onPage={onPage}
                    onSort={onSort}
                    resizableColumns={true}
                    columnResizeMode="expand"
                    showGridlines={false}
                    stripedRows={true}
                    sortField={paginator.sortField}
                    sortOrder={paginator.sortOrder}
                    loading={loading}
                    onSelectionChange={onSelectionChange}
                    selectAll={selectAll}
                    scrollable
                    scrollHeight="500px"
                    scrollDirection="both"
                    contextMenuSelection={user}
                    onContextMenuSelectionChange={e => setUser(e.value)}
                    onContextMenu={e => cm.current?.show(e.originalEvent)}>

                    <Column field="name" header="Nome" bodyClassName="uppercase" headerStyle={{ width: '25em' }} style={{ width: '25em' }} sortable />
                    <Column field="username" header="Usuário" bodyClassName="lowercase" headerStyle={{ width: '10em' }} style={{ width: '10em' }} sortable />
                    <Column field="email" header="Email" bodyClassName="lowercase" headerStyle={{ width: '20em' }} style={{ width: '20em' }} sortable />
                    <Column field="contact" header="Contato" body={contactBodyTemplate} headerStyle={{ width: '12em' }} style={{ width: '12em' }} />
                    <Column header="Conta" body={accountBodyTemplate} headerStyle={{ width: '10em' }} style={{ width: '10em' }} />
                    <Column header="Atualizado" field='updatedAt' body={dateBodyUpdatedAt} headerStyle={{ width: '13em' }} style={{ width: '13em' }} sortable />
                    <Column header="Criado" field='createdAt' body={dateBodyCreatedAt} headerStyle={{ width: '13em' }} style={{ width: '13em' }} sortable />
                </DataTable>
            </div>
        </div>
    );
}
export default DataTableUser;