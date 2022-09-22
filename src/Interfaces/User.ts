import { TagSeverityType } from 'primereact/tag';

export interface UserProps {
    id?: number;
    uuid?: string;
    name?: string;
    email?: string;
    contact?: string;
    whatsapp?: boolean;
    username?: string;
    password?: string;
    admin?: boolean;
    enabled?: boolean;
    permission?: Array<string>;
    userAgent?: string;
    host?: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface UserCreateProps {
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    contact?: string;
    whatsapp?: boolean;
    enabled?: boolean;
    admin?: boolean;
    permission?: Array<string>;
}