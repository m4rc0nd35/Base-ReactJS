import '../Styles/User.css';
import React, { useState } from 'react';
import axios from 'axios';
import { DataTable, DataTablePFSEvent, DataTableSelectionChangeParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PaginatorProps } from '../Interfaces/IMisc';
import { Authentication } from '../Service/AuthService';
import { useEffect } from 'react';
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom';
import { DataViewAuditLogProps } from '../Interfaces/DataView';
import { Tag } from 'primereact/tag';
import { Api } from '../Helpers/Api';

export default function AuditLogs() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [selectAll, setSelectAll] = useState(false);
    const [AuditLogs, setAuditLogs] = useState<Array<DataViewAuditLogProps>>([]);

    /* Pagination */
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [paginator, setPaginator] = useState<PaginatorProps>({
        first: 0,
        rows: 10,
        page: 0,
        sortField: "createdAt",
        sortOrder: 1
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

    /* Request AXIOS */
    useEffect(() => {
        setLoading(true); // loading show

        /* Request API */
        Api.request('GET', '/v1/audit/log', { params: paginator }).then((response) => {
            if (response.data.logs.length > 0)
                setAuditLogs(response.data.logs);

            setTotalRecords(response.data.totalRecords) // pagination
            setLoading(false); // loading hide
        }).catch((response) => {
            if (response.response.status === 401)
                history.push('/dashboard');

            setLoading(false) // loading hide
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const onSelectionChange = (event: DataTableSelectionChangeParams) => {
        setSelectAll(false);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => setPaginator({ ...paginator })} />;

    const operationTag = (rowData: DataViewAuditLogProps) => {
        let tag;
        switch (rowData.operation) {
            case "created":
                tag = <Tag className='mr-2 enabled-tag' severity="success" value="Criado" />;
                break;
            case "updated":
                tag = <Tag className='mr-2 enabled-tag' severity="info" value="Atualizado" />;
                break;
            case "deleted":
                tag = <Tag className='mr-2 disabled-tag' severity="danger" value="Excluido" />;
                break;
            default:
                tag = <Tag className='mr-2 enabled-tag' severity="warning" value="- - - - -" />;
                break;
        }
        return (
            <React.Fragment>
                {tag}
            </React.Fragment>
        )
    }

    const dateBodyCreatedAt = (rowData: DataViewAuditLogProps) => {
        return (
            <React.Fragment>
                {format(new Date(rowData.createdAt as Date), 'HH:mm:ss dd/MM/yyyy')}
            </React.Fragment>
        );
    }

    return (
        <div>
            <div className="card">
                <DataTable
                    value={AuditLogs}
                    dataKey="id"
                    lazy={true}
                    size="small"
                    selectionMode="single" // hover row show
                    rows={paginator.rows} // init count
                    rowsPerPageOptions={[10, 20, 50]} // select show count
                    totalRecords={totalRecords} // total rows
                    paginator={true} // show paginator
                    first={paginator.first}
                    paginatorLeft={paginatorLeft} // button refresh
                    onPage={onPage}
                    onSort={onSort}
                    sortField={paginator.sortField}
                    sortOrder={paginator.sortOrder}
                    loading={loading}
                    onSelectionChange={onSelectionChange}
                    selectAll={selectAll}
                    scrollable
                    scrollHeight="500px"
                    scrollDirection="both">

                    <Column field="user.name" header="Nome" bodyClassName="uppercase" headerStyle={{ width: '30em' }} style={{ width: '30em' }} />
                    <Column field="user.username" header="Usuário" bodyClassName="lowercase" headerStyle={{ width: '10em' }} style={{ width: '10em' }} />
                    <Column field="module" header="Operação" bodyClassName="uppercase" headerStyle={{ width: '30em' }} style={{ width: '30em' }} sortable />
                    {/* <Column field="details" header="Operação"  headerStyle={{ width: '12em' }} style={{ width: '12em' }} /> */}
                    <Column field="operation" header="Etiqueta" body={operationTag} headerStyle={{ width: '12em' }} style={{ width: '12em' }} sortable />
                    <Column header="Criado" field="createdAt" body={dateBodyCreatedAt} headerStyle={{ width: '13em' }} style={{ width: '13em' }} sortable />
                </DataTable>
            </div>
        </div>
    );
}