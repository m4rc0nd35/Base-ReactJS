import jwtDecode from "jwt-decode";
import { config } from '../setting'

interface IPayload {
	id: number;
	uuid: string,
	name: string,
	email: string
	contact: string;
	admin: boolean;
	enabled: boolean;
	permission: Array<string>
	iat: Number;
	exp: Number;
}

export class Authentication {

	static create = (token: string): boolean => {
		try {
			sessionStorage.setItem(config.TOKEN, token);
			return true;
		} catch (error) {
			return false;
		}
	}

	static token = (): string => {
		try {
			return String(sessionStorage.getItem(config.TOKEN));
		} catch (error) {
			throw new Error("Error token");
		}
	}

	static payload = (): IPayload => {
		try {
			const payload: IPayload = jwtDecode(String(sessionStorage.getItem(config.TOKEN)));
			return payload;
		} catch (error) {
			throw new Error("Error payload");
		}
	}

	static keepAlive = (): boolean => {
		try {
			const payload: IPayload = jwtDecode(String(sessionStorage.getItem(config.TOKEN)));
			const now: Number = (Date.now() / 1000);
			const alive = (payload.exp > now) ? true : false;

			if (!alive)
				this.delete();

			return alive;
		} catch (error) {
			this.delete();
			return false;
		}
	}


	static getOS = (): string => {
		const re = new RegExp(/(Mozilla\/5.0)\s\((.*)\)\s(A|G)/);
		let r = window.navigator.userAgent.match(re);
	
		if (r)
			return r[2].replace(';','');
		return '';
	}

	static delete = (): boolean => {
		try {
			sessionStorage.removeItem(config.TOKEN);
			return true;
		} catch (error) {
			return false;
		}
	}
}