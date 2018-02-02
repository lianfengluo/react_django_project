import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Store from './store';
import App from './routers/index';

render((<Provider store={Store}>
			<App/>
		</Provider>),document.getElementById('app'))
