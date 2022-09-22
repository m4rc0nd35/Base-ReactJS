import '../Styles/MultiSelect.css'
import React, { FormEvent, useRef, useState } from 'react';
import axios from 'axios'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { MultiSelect } from 'primereact/multiselect';
import { UserCreateProps } from '../Interfaces/User';
import { InputMask } from 'primereact/inputmask';
import { Checkbox } from 'primereact/checkbox';
import { Authentication } from '../Service/AuthService';

interface IProps {
    displayModal: boolean;
    hideDisplayModal: (b: boolean) => void;
}

const DialogCreateUser = (props: IProps) => {

    const [userData, setUserData] = useState<UserCreateProps>({
        enabled: true,
        admin: false,
        whatsapp: false,
        permission: []
    });

    const toast = useRef<Toast>(null);
    const msg = useRef<Messages>(null);

    const onHide = () => {
        props.hideDisplayModal(false);
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi  pi-times" onClick={() => onHide()} className="p-button-text p-button-danger" />
            </div>
        );
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        try {
            /* Request API */
            axios.post(String(process.env.REACT_APP_API_URL).concat("/v1/user/create"), userData, {
                headers: { 'Authorization': `Bearer ${Authentication.token()}` },
            }).then((response) => {
                toast?.current?.show({ severity: 'success', summary: 'Sucesso', detail: response.data.message, life: 3000 });
                /* Close dialog */
                props.hideDisplayModal(false);

            }).catch((err) => {
                if (err.response.status === 400)
                    for (let errs of err.response.data.errors)
                        toast?.current?.show({ severity: 'error', summary: 'Ocorreu um erro', detail: errs.msg, life: 3000 });

                if (err.response.status === 406)
                    return toast?.current?.show({ severity: 'error', summary: 'Ocorreu um erro', detail: err.response.data.message, life: 3000 });
                console.log(err)
            });

        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Requisitos</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.3' }}>
                <li>Pelo menos uma minuscula</li>
                <li>Pelo menos uma maiuscula</li>
                <li>Pelo menos uma numérica</li>
                <li>Minimo 8 digitos</li>
            </ul>
        </React.Fragment>
    );

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    return (
        <Dialog
            header="Novo usuário"
            visible={props.displayModal}
            modal={true}
            className="w-35rem"
            draggable={false}
            // transitionOptions={{disabled: true}}
            footer={renderFooter()}
            onHide={() => onHide()}>
            <Toast ref={toast} />

            <form onSubmit={onSubmit} className="p-fluid">
                <Messages ref={msg} />
                <div className="field mt-5">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-user" />
                        <InputText
                            name="name"
                            // value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.currentTarget.value })}
                            autoFocus />

                        <label htmlFor="name">Nome completo*</label>
                    </span>
                </div>
                <div className="field grid mt-5">
                    <div className="flex col-12 md:col-9">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText
                                name="email"
                                // value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.currentTarget.value })} />

                            <label htmlFor="email">Email*</label>
                        </span>
                    </div>
                </div>
                <div className="field grid mt-5">
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-phone" />
                            <InputMask
                                mask="(99) 9999-9999"
                                name="contactPhone"
                                // value={userData.contact}
                                onChange={e => setUserData({ ...userData, contact: e.value })} />

                            <label htmlFor="contactPhone">Telefone*</label>
                        </span>
                    </div>
                    <div className="field-checkbox mt-2 col-12 md:col-6">
                        <Checkbox
                            inputId="whatsapp"
                            checked={userData.whatsapp}
                            onChange={e => setUserData({ ...userData, whatsapp: e.checked })} />

                        <label htmlFor="whatsapp">Whatsapp?</label>
                    </div>
                </div>
                <div className="field grid mt-5">
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-user" />
                            <InputText
                                name="usernameCreate"
                                // value={userData.username}
                                onChange={e => setUserData({ ...userData, username: e.currentTarget.value })} />

                            <label htmlFor="usernameCreate">Usuário*</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Password
                                name="passwordCreate"
                                promptLabel="Digite a senha"
                                weakLabel="Senha vunerável"
                                mediumLabel="Senha moderada"
                                strongLabel="Senha forte"
                                // value={userData.password}
                                onChange={e => setUserData({ ...userData, password: e.currentTarget.value })}
                                toggleMask
                                footer={passwordFooter} />

                            <label htmlFor="passwordCreate">Senha*</label>
                        </span>
                    </div>

                </div>
                <div className="field grid mt-5">
                    <div className="field-checkbox mt-2 col-12 md:col-6">
                        <Checkbox
                            inputId="enabled"
                            checked={userData.admin}
                            onChange={e => setUserData({ ...userData, admin: e.checked })} />
                        <label htmlFor="enabled">Administrador</label>
                    </div>
                    <div className="field-checkbox mt-2 col-12 md:col-6">
                        <Checkbox
                            inputId="enabled"
                            checked={userData.enabled}
                            onChange={e => setUserData({ ...userData, enabled: e.checked })} />
                        <label htmlFor="enabled">Usuário ativo</label>
                    </div>
                </div>
                <div className="field multiselect-permission mt-5">
                    <MultiSelect
                        value={userData.permission}
                        options={countries}
                        onChange={(e) => setUserData({ ...userData, permission: e.value })}
                        optionLabel="name"
                        display="chip"
                        filter
                        placeholder="Selecione as permissões para o usuário"
                        disabled={userData.admin}
                        className="multiselect-custom" />
                </div>
                <Button type="submit" label="Criar usuário" className="mt-1" />
            </form>
        </Dialog>
    )
}

export default DialogCreateUser;