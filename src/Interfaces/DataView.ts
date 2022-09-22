export interface UserProps {
    name?: string;
    username?: string;
}

export interface DataViewAuditLogProps {
    id?: string;
    idUser?: string;
    module?: string;
    operation?: string;
    details?: Object;
    createdAt?: Date
    user?: UserProps
}

export enum AuthStatus {
    unknown,
    authorized,
    unauthorized
}

export interface DataViewAuditAuthProps {
    id?: string;
    userAgent?: string;
    host?: string;
    statusCode: string;
    createdAt?: Date
    user?: UserProps
}