import { Menubar } from 'primereact/menubar';
import { MenuItemCommandParams } from 'primereact/menuitem';
import Users from './User'
import Dashboard from './Dashboard'
import TaskDragDrop from './Task'
// import { ProgressBar } from 'primereact/progressbar';
import { IconContext } from 'react-icons/lib';
import { Route, useHistory } from 'react-router-dom';
import { Card } from 'primereact/card';
import Customer from './Customer';

/* begin Icons */
import { GiCctvCamera } from "react-icons/gi";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { SiCivicrm } from "react-icons/si";
import { RiFileHistoryLine } from 'react-icons/ri';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { BsCurrencyExchange } from 'react-icons/bs';
import { IoMdGitNetwork } from 'react-icons/io';
import { GoOrganization } from 'react-icons/go';
import { TbListCheck } from 'react-icons/tb';
import { FaTasks } from 'react-icons/fa';

const Home = () => {

	const history = useHistory()

	const items = [
		{
			label: 'Tarefas',
			icon: FaTasks({}),
			target: "task",
			command: (e: MenuItemCommandParams) => {
				console.log(e.item.target);
				history.push('/task');
			}
		},
		{
			label: 'Dashboard',
			icon: 'pi pi-fw pi-desktop',
			target: "test target",
			command: (e: MenuItemCommandParams) => {
				console.log(e.item.target);
				history.push('/dashboard');
			}
		},
		{
			label: 'Cameras',
			icon: GiCctvCamera({}),
			items: [
				{
					label: 'Nova camera',
					icon: 'pi md-6 pi-fw pi-plus',

				},
				{
					label: 'Mosaico',
					icon: MdAutoAwesomeMosaic({}),
					command: (e: MenuItemCommandParams) => history.push("/")
				},
				{
					separator: true
				},
				{
					label: 'Export',
					icon: 'pi pi-fw pi-external-link'
				}
			]
		},
		{
			label: 'CRM',
			icon: SiCivicrm({}),
			items: [
				{
					label: 'Clientes',
					icon: GoOrganization({}),
					command: (e: MenuItemCommandParams) => history.push("/customers")
				},
				{
					label: 'Usuários',
					icon: 'pi pi-fw pi-user',
					command: (e: MenuItemCommandParams) => history.push("/users")
				},
				{
					label: 'logs de acessos',
					icon: TbListCheck({})
				}

			]
		},
		{
			label: 'Relatório',
			icon: RiFileHistoryLine({}),
			items: [
				{
					label: 'Edit',
					icon: 'pi pi-fw pi-pencil',
					items: [
						{
							label: 'Save',
							icon: 'pi pi-fw pi-calendar-plus'
						},
						{
							label: 'Delete',
							icon: 'pi pi-fw pi-calendar-minus'
						}
					]
				},
				{
					label: 'Archieve',
					icon: 'pi pi-fw pi-calendar-times',
					items: [
						{
							label: 'Remove',
							icon: 'pi pi-fw pi-calendar-minus'
						}
					]
				}
			]
		},
		{
			label: 'Financeiro',
			icon: BsCurrencyExchange({}),
			items: [
				{
					label: 'Planos',
					icon: 'pi pi-fw pi-power-off',
				},
				{
					label: 'Pagamentos e faturas',
					icon: 'pi pi-fw pi-power-off',
				},
			]
		},
		{
			label: 'Inteligências',
			icon: GiArtificialIntelligence({}),
			items: [
				{
					label: "Analiticos",
					icon: "LPR's"
				},
				{
					label: "Analiticos",
					icon: "LPR's"
				}
			]
		},
		{
			label: 'Rede Colaborativa',
			icon: IoMdGitNetwork({})
		}
	];

	return (
		<div>
			<header >
				<IconContext.Provider value={{ className: 'react-icons' }}>
					<Menubar model={items} className='border-noround z-5 fixed w-screen surface-50' />
				</IconContext.Provider>
			</header>

			<main className='main-home w-full'>
				<Card className="card m-3 p-0">
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/users" component={Users} />
					<Route path="/customers" component={Customer} />
					<Route path="/task" component={TaskDragDrop} />
				</Card>
			</main>
		</div>);

}
export default Home;