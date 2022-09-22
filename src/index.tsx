import './Styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { config } from "dotenv";

config();

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
