import { DataTableSortOrderType } from "primereact/datatable";

export interface PaginatorProps {
    first: number;
    rows: number;
    page: number;
    sortField: string;
    sortOrder: DataTableSortOrderType;
}

