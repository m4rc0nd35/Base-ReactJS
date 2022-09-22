import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import DialogCreateUser from '../Dialog/CreateUser';
import { Toolbar } from 'primereact/toolbar';
import DataTableUser from '../DataView/Users';
import { InputText } from 'primereact/inputtext';
import AuditAuthUser from '../DataView/AuditAuthUser';
import AuditLogs from '../DataView/AuditLogs';

const Users = () => {
	const [dialogCreateUser, setDialogCreateUser] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0);

	const leftContents = (
		<React.Fragment>
			<Button label="Novo usuário" icon="pi pi-plus" className="mr-2 p-button-sm" onClick={e => setDialogCreateUser(true)} />
		</React.Fragment>
	);

	const rightContents = (
		<React.Fragment>
			<InputText style={{ width: 200 }} placeholder="Pesquisa"></InputText>
		</React.Fragment>
	);

	return (
		<div>
			<DialogCreateUser
				displayModal={dialogCreateUser}
				hideDisplayModal={setDialogCreateUser} />

			<TabView
				className='mt-4'
				activeIndex={activeIndex}
				onTabChange={(e) => setActiveIndex(e.index)}>

				<TabPanel
					header="Usuários"
					leftIcon='pi mr-2 pi-user'>
					<div className='rm-box-shadow mt-4'>
						<Toolbar left={leftContents} right={rightContents} />
						<DataTableUser />
					</div>
				</TabPanel>

				<TabPanel
					header="Historico de autenticações"
					leftIcon='pi mr-2 pi-history'>
					<div className='rm-box-shadow mt-4'>
						<AuditAuthUser />
					</div>
				</TabPanel>

				<TabPanel
					header="Historico de logs"
					leftIcon='pi mr-2 pi-history'>
					<div className='rm-box-shadow mt-4'>
						<AuditLogs />
					</div>
				</TabPanel>
			</TabView>
		</div>
	)
}

export default Users;