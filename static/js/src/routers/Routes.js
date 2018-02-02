import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Home from '../containers/homeContainer';
import { UserRoute } from './userRoute'
import NoMatchComponent from '../components/noMatchComponent';


// main router
export default class myRoutes extends React.Component{
	render(){
		return(
		 <div>
			<Switch>
			  	<Route exact path='/' component={Home} />
	{/*		  	<Route exact path='/user/register' component={Register} />
		        <Route exact path='/user/login/:login_way' component={Login} />
		        <Route exact path='/user/login' component={Login} />
		        <Route exact path='/user/forgot_password' component={ForgotPassword} />
		        <Route exact path='/user/profile/edit_image' component={UserImage} />
		        <Route exact path='/user/profile/user_profile_center' component={UserProfileCenter} />
		        <Route exact path='/user/profile/edit_user_email' component={EditUserEmail} />
		        <Route exact path='/user/profile/edit_user_nickname' component={EditUserNickname} />*/}
			  	<Route path="/user" component={UserRoute}/>
			  	<Route component={NoMatchComponent} />
	    	</Switch>
	     </div>
	        )
	    }
}
