import React from 'react';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import Routes from './Routes'
import AppWrap from '../components/appWrap';

export default class Routerlist extends React.Component{
    render(){
		return(
			<Router history={hashHistory} basename='/#'>
			  <AppWrap>
			    <Routes/>
			  </AppWrap>
			</Router>
		)
	}
}
