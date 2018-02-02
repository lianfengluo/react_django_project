import React from 'react';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import Routes from './Routes'
import App from '../components/app';

export default class Routerlist extends React.Component{
    render(){
		return(
			<Router history={hashHistory} basename='/#'>
			  <App>
			    <Routes/>
			  </App>
			</Router>
		)
	}
}
