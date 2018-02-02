import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Switchlogin = (props) =>{if(props.currentway=='email') return(
		<div>
		<Link to='/user/login/username' className='login_left_link'><Icon type="left-square" /><Icon type="user"/>by username</Link>
		<Link to='/user/login/phone' className='login_right_link'><Icon type="phone"/>by phone<Icon type="right-square" /></Link>
		</div>
	) 
	else if(props.currentway=='phone') return(
		<div>
		<Link to='/user/login/email' className='login_left_link'><Icon type="left-square" /><Icon type="mail"/>by email</Link>
		<Link to='/user/login/username' className='login_right_link'><Icon type="user"/>by username<Icon type="right-square" /></Link>
		</div>
	)
	else if(props.currentway=='username') return(
		<div>
		<Link to='/user/login/phone' className='login_left_link'><Icon type="left-square" /><Icon type="phone"/>by phone</Link>
		<Link to='/user/login/email' className='login_right_link'><Icon type="mail"/>by email<Icon type="right-square" /></Link>
		</div>
		)}

export default Switchlogin;