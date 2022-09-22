import axios, { AxiosResponse } from 'axios';
import { Authentication } from '../Service/AuthService';

interface RequestProps {
    params?: Object | string;
    data?: Object | string;
}

export class Api {

    static request = (
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE', 
        endpoint: string, 
        req?: RequestProps): Promise<AxiosResponse> => {
            
        return new Promise((resolve, reject) => {
            /* Request API */
            axios.request({
                ...req,
                url: String(process.env.REACT_APP_API_URL).concat(endpoint),
                method,
                headers: { 'Authorization': `Bearer ${Authentication.token()}` },
            }).then(response => resolve(response))
                .catch(response => resolve(response))
        })
    }
}