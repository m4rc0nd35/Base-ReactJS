import '../Styles/MultiSelect.css'
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { InputSwitch } from 'primereact/inputswitch';
import { Fieldset } from 'primereact/fieldset';
import { ICustomerProps } from '../Interfaces/ICustomer';
import { Checkbox } from 'primereact/checkbox';

import { GiLion } from 'react-icons/gi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdStreetview } from 'react-icons/md';

const CreateCustomer = () => {

    const [customerData, setCustomerData] = useState<ICustomerProps>({
        panicButton: false,
        alertCamera: false,
        lprManager: false,
        whatsapp: false
    });

    const toast = useRef<Toast>(null);
    const msg = useRef<Messages>(null);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(event)
        console.log(customerData)

        // for (let u of customerData)
        toast?.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado!', life: 3000 });
        msg?.current?.show({ severity: 'error', detail: 'Favor, preencher todos os campos!', life: 2000 });
    }

    useEffect(() => {
        console.log(customerData);
    }, [customerData])

    const paymentDayOp = [
        {
            label: "Dia 1",
            value: 1
        },
        {
            label: "Dia 5",
            value: 5
        },
        {
            label: "Dia 10",
            value: 10
        },
        {
            label: "Dia 15",
            value: 15
        },
        {
            label: "Dia 20",
            value: 20
        },
        {
            label: "Dia 25",
            value: 25
        }
    ];

    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={onSubmit} className="p-fluid">
                <Messages ref={msg} />
                <div className='flex flex-wrap gap-3 p-0'>
                    <Fieldset legend="Dados cadastrais" className='mt-3 m-0 min-field-set'>
                        <div className="field mt-5">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-user" />
                                <InputText
                                    name="nameFantasy"
                                    value={customerData.nameFantasy}
                                    onChange={e => setCustomerData({ ...customerData, nameFantasy: e.currentTarget.value })}
                                    autoFocus
                                    className={classNames({ 'p-invalid': false })} />

                                <label htmlFor="nameFantasy" className={classNames({ 'p-error': false })}>Nome fantasia*</label>
                            </span>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi"><GiLion/></i>
                                <InputText
                                    name="cpfCnpj"
                                    value={customerData.cpfCnpj}
                                    onChange={e => setCustomerData({ ...customerData, cpfCnpj: e.currentTarget.value })}
                                    className={classNames({ 'p-invalid': false })} />

                                <label htmlFor="cpfCnpj" className={classNames({ 'p-error': false })}>CPF/C.N.P.J*</label>
                            </span>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    name="contactEmail"
                                    value={customerData.contactEmail}
                                    onChange={e => setCustomerData({ ...customerData, contactEmail: e.currentTarget.value })}
                                    className={classNames({ 'p-invalid': false })} />

                                <label htmlFor="email" className={classNames({ 'p-error': false })}>Email*</label>
                            </span>
                        </div>

                        <div className="field grid mt-5">
                            <div className="col-12 md:col-7">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-phone" />
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        name="contactPhone"
                                        value={customerData.contactPhone}
                                        onChange={e => setCustomerData({ ...customerData, contactPhone: e.value })}
                                        className={classNames({ 'p-invalid': false })} />

                                    <label htmlFor="contactPhone" className={classNames({ 'p-error': false })}>Telefone*</label>
                                </span>
                            </div>

                            <div className="field-checkbox mt-2 col-12 md:col-4">
                                <Checkbox
                                    inputId="whatsapp"
                                    checked={customerData.whatsapp}
                                    onChange={e => setCustomerData({ ...customerData, whatsapp: e.checked })} />
                                <label htmlFor="whatsapp">É Whatsapp ?</label>
                            </div>

                            <div className="field mt-5 col-12 md:col-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        name="segment"
                                        value={customerData.segment}
                                        onChange={e => setCustomerData({ ...customerData, segment: e.value })}
                                        options={paymentDayOp}
                                        optionLabel="label" />

                                    <label htmlFor="contact">Segmento</label>
                                </span>
                            </div>
                        </div>
                    </Fieldset>

                    <Fieldset legend='Endereço' className='mt-3 m-0 min-field-set'>
                        <div className="field mt-5">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi"><MdStreetview/></i>
                                <InputText
                                    name="address"
                                    value={customerData.address}
                                    onChange={e => setCustomerData({ ...customerData, address: e.currentTarget.value })}
                                    className={classNames({ 'p-invalid': false })} />

                                <label htmlFor="address" className={classNames({ 'p-error': false })}>Endereço*</label>
                            </span>
                        </div>

                        <div className="field grid mt-5">
                            <div className='col-12 md:col-5'>
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi"><AiOutlineFieldNumber/></i>
                                    <InputNumber
                                        name="addressNumber"
                                        mode="decimal"
                                        useGrouping={false}
                                        value={customerData.addressNumber}
                                        onChange={e => setCustomerData({ ...customerData, addressNumber: Number(e.value) })}
                                        className={classNames({ 'p-invalid': false })} />

                                    <label htmlFor="addressNumber" className={classNames({ 'p-error': false })}>Número*</label>
                                </span>
                            </div>

                            <div className='field col-12 md:col-7'>
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-info-circle" />
                                    <InputText
                                        name="complement"
                                        value={customerData.complement}
                                        onChange={e => setCustomerData({ ...customerData, complement: e.currentTarget.value })}
                                        className={classNames({ 'p-invalid': true })} />

                                    <label htmlFor="complement" className={classNames({ 'p-error': false })}>Complemento*</label>
                                </span>
                            </div>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-info-circle" />
                                <InputText
                                    name="district"
                                    value={customerData.district}
                                    onChange={e => setCustomerData({ ...customerData, district: e.currentTarget.value })}
                                    className={classNames({ 'p-invalid': true })} />

                                <label htmlFor="district">Bairro</label>
                            </span>
                        </div>

                        <div className="field grid mt-5">
                            <div className='col-12 md:col-9'>
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-info-circle" />
                                    <InputText
                                        name="city"
                                        value={customerData.district}
                                        onChange={e => setCustomerData({ ...customerData, city: e.currentTarget.value })}
                                        className={classNames({ 'p-invalid': true })} />

                                    <label htmlFor="city">Cidade</label>
                                </span>
                            </div>
                            <div className='col-12 md:col-3'>

                                <span className="p-float-label">
                                    <InputText
                                        name="uf"
                                        value={customerData.uf}
                                        onChange={e => setCustomerData({ ...customerData, uf: e.currentTarget.value })}
                                        className={classNames({ 'p-invalid': true })} />

                                    <label htmlFor="uf">UF</label>
                                </span>
                            </div>
                        </div>
                    </Fieldset>

                    <Fieldset legend='Informações adicionais' className='mt-3 m-0 min-field-set'>
                        <div className="field mt-5">
                            <span className="p-float-label">
                                <Dropdown
                                    name="contact"
                                    value={customerData.paymentDay}
                                    onChange={e => setCustomerData({ ...customerData, paymentDay: e.value })}
                                    options={paymentDayOp}
                                    optionLabel="label" />

                                <label htmlFor="contact">Melhor dia vcto</label>
                            </span>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label">
                                <h5>Botão de panico</h5>
                                <InputSwitch
                                    checked={customerData.panicButton}
                                    onChange={(e) => setCustomerData({ ...customerData, panicButton: e.value })}
                                />
                            </span>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label">
                                <h5>Alerta de cameras offline</h5>
                                <InputSwitch
                                    checked={customerData.alertCamera}
                                    onChange={(e) => setCustomerData({ ...customerData, alertCamera: e.value })}
                                />
                            </span>
                        </div>

                        <div className="field mt-5">
                            <span className="p-float-label">
                                <h5>Acesso LPR</h5>
                                <InputSwitch
                                    checked={customerData.lprManager}
                                    onChange={(e) => setCustomerData({ ...customerData, lprManager: e.value })}
                                />
                            </span>
                        </div>
                    </Fieldset>
                </div>
                <Button type="submit" label="Criar usuário" className="w-auto mt-5 " />
            </form>
        </div>
    )
}

export default CreateCustomer;