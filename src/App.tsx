import './Styles/App.css'
import "primereact/resources/themes/arya-blue/theme.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
// import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import Home from './Page/Home';
import Auth from './Page/Auth';
import { NotFound } from './Page/NotFound';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from './Router/PrivateRoute';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/404" component={NotFound} />
				<PublicRoute exact path="/auth" component={Auth} />
				<PrivateRoute exact path="/*" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;