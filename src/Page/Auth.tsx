import { FormEvent, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Authentication } from '../Service/AuthService';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios'
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';

type IUser = {
	username: string;
	password: string;
	userAgent: string;
}

const Auth = () => {
	const history = useHistory();
	const msg = useRef<Messages>(null);
	const toast = useRef<Toast>(null);
	const [disabled, setDisabled] = useState(false)
	const [userAuth, setUserAuth] = useState<IUser>({
		username: "",
		password: "",
		userAgent: Authentication.getOS()
	});

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setDisabled(true);
			/* Request API */
			axios.request({
				url: String(process.env.REACT_APP_API_URL).concat("/v1/user/auth"),
				data: userAuth,
				method: 'POST',
			}).then((response) => {
				toast?.current?.show({ severity: 'success', summary: 'Sucesso', detail: response.data.message, life: 3000 });

				/* Create TOKEN on local session */
				const success = Authentication.create(response.data.access_token);
				if (success)
					history.push('/dashboard');

			}).catch((err) => {
				setDisabled(false);
				msg?.current?.show({ severity: 'error', detail: err.response.data.message, life: 2000 });
			});

		} catch (error) {
			console.log((error as Error).message)
		}
	}

	return (
		<main className='flex'>
			<Toast ref={toast} />
			<Card
				header={<img alt="loading..." src='./assets/images/cam.jpeg' />}
				// title='Autenticação'
				// subTitle='Plataforma de monitoramento inteligente.'
				style={{
					position: 'absolute',
					margin: 'auto',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: 320,
					height: 420
				}}>
					
				<Messages ref={msg} />

				<div className='p-5'>
					<form onSubmit={e => submitHandler(e)}>
						<div className="field">
							<span className="p-float-label">
								<InputText
									name="username"
									type="text"
									className="p-inputtext-sm block mb-4 w-full"
									onChange={e => setUserAuth({ ...userAuth, username: e.currentTarget.value })}
									value={userAuth.username}
									required
									disabled={disabled}
								/>
								<label htmlFor="username">Login</label>
							</span>
						</div>

						<div className="field">
							<span className="p-float-label">
								<InputText
									type="password"
									name="password"
									className="p-inputtext-sm block mb-4 w-full"
									onChange={e => setUserAuth({ ...userAuth, password: e.currentTarget.value })}
									value={userAuth.password}
									required
									disabled={disabled}
								/>
								<label htmlFor="password">Senha</label>
							</span>
						</div>

						<Button
							label='Autanticar'
							icon="pi pi-lock-open"
							className="p-button-success md-4"
							type="submit"
							loading={disabled}
							loadingIcon="pi pi-spin pi-sun"
							disabled={disabled} />
					</form>
				</div>
			</Card >
		</main >
	)
}
export default Auth;