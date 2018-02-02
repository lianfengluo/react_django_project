import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Register from '../containers/registerContainer';
import Login from '../containers/loginContainer';
import ForgotPassword from '../containers/forgotPasswordContainer';
import UserImage from '../containers/userImageContainer';
import UserProfileCenter from '../containers/userProfileCenterContainer';
import EditUserEmail from '../containers/editUserEmailContainer';
import EditUserNickname from '../containers/editUserNicknameContainer';
import NoMatchComponent from '../components/noMatchComponent';

// user profile router
const UserProfileRouter = ({match}) => (
	<Switch>
		<Route exact path={match.url + '/edit_image'} component={UserImage}/>
		<Route exact path={match.url + '/user_profile_center'} component={UserProfileCenter}/>
		<Route exact path={match.url + '/edit_user_email'} component={EditUserEmail}/>
		<Route exact path={match.url + '/edit_user_nickname'} component={EditUserNickname}/>
		<Route component={NoMatchComponent} />
	</Switch>
)

// user model router
export const UserRoute = ({match}) => (
	<Switch>
		<Route exact path={match.url + '/register'} component={Register}/>
		<Route exact path={match.url + '/login/:login_way'} component={Login}/>
		<Route exact path={match.url + '/login'} component={Login}/>
		<Route exact path={match.url + '/forgot_password'} component={ForgotPassword}/>
		<Route path={match.url + '/profile'} component={UserProfileRouter}/>
		<Route component={NoMatchComponent} />
	</Switch>
)

