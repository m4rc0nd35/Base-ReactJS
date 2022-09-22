import React, { useState } from 'react';
// import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import CreateCustomer from './CreateCustomer';
import DataTableCustomer from '../DataView/Customer';

const Customer = () => {

	// const id = useParams();
	// console.log(id)

	const [activeIndex, setActiveIndex] = useState(0);

	const rightContents = (
		<React.Fragment>
			<InputText style={{ width: 200 }} placeholder="Pesquisa"></InputText>
		</React.Fragment>
	);

	return (
		<div>
			<TabView
				className='mt-4'
				activeIndex={activeIndex}
				onTabChange={(e) => setActiveIndex(e.index)}>

				<TabPanel header="Vizualizar" >
					<div className='rm-box-shadow mt-4'>
						<Toolbar right={rightContents} />
						<DataTableCustomer />
					</div>
				</TabPanel>
				<TabPanel header="Cadastrar">
					<CreateCustomer></CreateCustomer>
				</TabPanel>
			</TabView>
		</div>
	)
}

export default Customer;
