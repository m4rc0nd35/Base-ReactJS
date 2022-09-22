export interface ICustomerProps {
    nameFantasy?: string;
    cpfCnpj?: string;
    contactPhone?: string;
    whatsapp?: boolean;
    contactEmail?: string;
    segment?: string;
    address?: string;
    addressNumber?: number;
    complement?: string;
    district?: string;
    city?: string;
    uf?: string;
    paymentDay?: number;
    panicButton?: boolean;
    alertCamera?: boolean;
    lprManager?: boolean;
}

export interface ICustomerData {
    id?: number;
    nameFantasy?: string;
    cpfCnpj?: string;
    contactPhone?: string;
    whatsapp?: boolean;
    contactEmail?: string;
    segment?: string;
    address?: string;
    addressNumber?: number;
    complement?: string;
    district?: string;
    city?: string;
    uf?: string;
    paymentDay?: number;
    panicButton?: boolean;
    alertCamera?: boolean;
    lprManager?: boolean;
    created_at?: string;
} 