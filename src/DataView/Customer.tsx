import '../Styles/Customer.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ContextMenu } from 'primereact/contextmenu';
import { Button } from 'primereact/button';
import { PaginatorProps } from '../Interfaces/IMisc';
import { ICustomerData } from '../Interfaces/ICustomer';
import { Authentication } from '../Service/AuthService';

const DataTableCustomer = () => {
    const [user, setUser] = useState<ICustomerData>({});
    const cm = useRef<ContextMenu>(null);
    const [loading, setLoading] = useState(false)
    const [paginator, setPaginator] = useState<PaginatorProps>({
        first: 0,
        rows: 10,
        page: 5,
        sortField: "id",
        sortOrder: 1,
    });

    const onPage = (event: DataTablePFSEvent) => {
        setPaginator({
            first: event.first,
            rows: event.rows,
            page: event.page as number,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }

    useEffect(() => {
        console.log('useEffect', paginator)
        try {
            setLoading(true)
            /* Request API */
            axios.request({
                url: process.env.REACT_APP_API_URL,
                params: paginator,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${Authentication.token()}` },
            }).then((response) => {
                console.log(response)
                setLoading(false)
            }).catch((response) => {
                console.log(response)
                setLoading(false)
            });

        } catch (error) {
            console.log((error as Error).message)
        }
    }, [paginator]);

    const onSort = (event: DataTablePFSEvent) => {
        setPaginator({
            first: event.first,
            rows: event.rows,
            page: event.page as number,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }

    const customers: ICustomerData[] = [
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "FlyCAM Safety MEI",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@pcp.tec.br",
            contactPhone: "(84) 98898-4869",
            whatsapp: true,
            segment: "Agro, etc",
            city: "Parnamirim",
            uf: "RN",
            paymentDay: 5,
            panicButton: true,
            alertCamera: true,
            lprManager: true,
            created_at: "23:47:12 2022-08-27",
        },
        {
            id: 1321321,
            nameFantasy: "MTSIS AUTOMAÇÃO LTDA",
            cpfCnpj: "12.040.845/0001-90",
            contactEmail: "jean.marcondes@mtsis.com.br",
            contactPhone: "(84) 99898-7858",
            whatsapp: false,
            segment: "Sistema de computadores",
            city: "Natal",
            uf: "RN",
            paymentDay: 5,
            panicButton: false,
            alertCamera: false,
            lprManager: false,
            created_at: "23:47:12 2022-08-27",
        }
    ]

    const paginatorLeft = (<Button type="button" icon="pi pi-refresh" className="p-button-text" />);

    const serviceBodyTemplate = (rowData: ICustomerData) => {
        return (
            <React.Fragment>
                {rowData.panicButton ? <Tag className="mr-2" severity='danger' value='PANICO' /> : null}
                {rowData.alertCamera ? <Tag className="mr-2" severity='warning' value='ALERTA' /> : null}
                {rowData.lprManager ? <Tag className="mr-2" severity='info' value='LPR' /> : null}
            </React.Fragment>
        );
    }

    const contactBodyTemplate = (rowData: ICustomerData) => {
        /* Case Whatsapp true, color green items */
        return (
            <React.Fragment>
                {rowData.whatsapp ? (<div >{rowData.contactPhone}</div>) : rowData.contactPhone}
                {rowData.whatsapp ? <div className='pi pi-fw icon-whatsapp pi-whatsapp'></div> : <div className='pi pi-fw pi-phone'></div>}
            </React.Fragment>
        );
    }

    const viewCustomer = (user: ICustomerData) => {
        console.log(user)
    }

    const deleteCustomer = (user: ICustomerData) => {
        const index = customers.indexOf(user);
        customers.slice(index, 0);
        console.log(index, user)
    }

    const menuModel = [
        { label: 'Vizualizar dados', icon: 'pi pi-fw pi-book', command: () => viewCustomer(user) },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', target: "Delete", command: () => deleteCustomer(user) }
    ];

    return (
        <div>
            <ContextMenu model={menuModel} ref={cm} onHide={console.log} />
            <div className="card">
                <DataTable
                    value={customers}
                    dataKey="id"
                    lazy={true}
                    size="small"
                    selectionMode="single" // hover row show
                    rows={paginator.rows} // init count
                    rowsPerPageOptions={[10, 20, 50]} // select show count
                    totalRecords={customers.length} // total rows
                    paginator={true} // show paginator
                    paginatorLeft={paginatorLeft} // button refresh
                    onPage={onPage}
                    onSort={onSort}
                    first={paginator.first}
                    sortField={paginator.sortField} // column
                    sortOrder={paginator.sortOrder} // asc/desc
                    loading={loading}
                    scrollable
                    scrollHeight="500px"
                    scrollDirection="both"
                    contextMenuSelection={user}
                    onContextMenuSelectionChange={e => setUser(e.value)}
                    onContextMenu={e => cm.current?.show(e.originalEvent)}>

                    <Column field="nameFantasy" header="Nome fantasia" bodyClassName="uppercase" headerStyle={{ width: '25em' }} style={{ width: '25em' }} frozen={true} sortable />
                    <Column header="Serviços" body={serviceBodyTemplate} headerStyle={{ width: '15em' }} style={{ width: '15em' }} />
                    <Column field="cpfCnpj" header="CPF/C.N.P.J" headerStyle={{ width: '12em' }} style={{ width: '12em' }} />
                    <Column header="Contato telefônico" body={contactBodyTemplate} headerStyle={{ width: '12em' }} style={{ width: '12em' }} />
                    <Column field="contactEmail" header="Email" headerStyle={{ width: '20em' }} style={{ width: '20em' }} />
                    <Column field="city" header="Cidade" bodyClassName="uppercase" headerStyle={{ width: '20em' }} style={{ width: '20em' }} sortable />
                    <Column field="uf" header="UF" bodyClassName="uppercase" headerStyle={{ width: '5em' }} style={{ width: '5em' }} sortable />
                    <Column header="Criado em" field="created_at" headerStyle={{ width: '14em' }} style={{ width: '14em' }} sortable />
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableCustomer;