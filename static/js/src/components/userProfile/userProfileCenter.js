import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Row, Col,Form, Icon, Input, Button } from 'antd';

export default class UserProfileCenter extends React.Component {
	constructor(props) {
	  super(props);
	  this.redirect_to_login = this.redirect_to_login.bind(this);
	  this.edit_user_email = this.edit_user_email.bind(this);
	  this.edit_user_nickname = this.edit_user_nickname.bind(this);
	}
	redirect_to_login(){
		this.props.history.push('/user/login/username');
	}
	edit_user_nickname(){
		this.props.history.push('/user/profile/edit_user_nickname');
	}
	edit_user_email(){
		this.props.history.push('/user/profile/edit_user_email');
	}
	componentWillReceiveProps(nextprops) {
		if(nextprops.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		}
	}
	componentDidMount(){
		if(this.props.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		} 
	}
	componentWillUnmount() {
        clearInterval(this.redirect_timer);
    }
	render(){
		const { userinfo } = this.props;
		const customLayout = {
			xs: { span: 18, push:3 },
	        sm: { span: 16, push:4 },
	        md: { span: 14, push:5 },
	        lg: { span: 12, push:6 },
		}
		if (userinfo.userinfo.user){
			return(
				<center>
			<Row>
				<Col {...customLayout}>
				<form>
					<legend>My profile center</legend>
					<div style={{border:'3px dashed #C0C0C0',borderRadius:'10px',padding:'5px'}}>
						<center>
							<div style={{marginBottom:'20px'}}>
								<h2>
								<Icon type="user"/>{userinfo.userinfo.nickname}&nbsp;&nbsp;&nbsp;
								<Icon type='edit' style={{cursor:'pointer'}} onClick={this.edit_user_nickname}/>
								</h2>
							</div>
							<img src={userinfo.userinfo.image} alt={`${userinfo.userinfo.nickname}'s image`}/>
							<div style={{marginBottom:'20px'}}>
								<Link className='change_profile_image' to='/user/profile/edit_image'>Change your image</Link>
							</div>
						</center>
					</div>
				<br/>
				<Col span={12}>
					<div style={{border:'3px dashed #C0C0C0',borderRadius:'10px',padding:'5px',height:'120px'}}>
						<center>
							<h2>
							<Icon type="mail"/>E-mail:&nbsp;
							</h2>
						{userinfo.userinfo.user.email?(
						<div>
							<h3>
							{userinfo.userinfo.user.email}&nbsp;&nbsp;&nbsp;
							<Icon onClick={this.edit_user_email} type='edit' style={{cursor:'pointer'}}/>
							</h3>
						</div>
						):(
						<div>
							<Button type='primary' onClick={this.edit_user_email}>Bind your E-mail</Button>
						</div>
						)}
						</center>
					</div>
				</Col>
				<Col span={12}>
					<div style={{border:'3px dashed #C0C0C0',borderRadius:'10px',padding:'5px',height:'120px'}}>
						<center>
							<h2>
							<Icon type="phone"/>Phone number:&nbsp;
							</h2>
							{userinfo.userinfo.phone?
								(
								<div>
									<h3>
									{userinfo.userinfo.phone}&nbsp;&nbsp;&nbsp;
									<Icon type='edit' style={{cursor:'pointer'}}/>
									</h3>
								</div>
								):(<div>
									<Button type='primary'>Bind your phone</Button>
								</div>
								)
							}
						</center>
					</div>
				</Col>
				</form>
				</Col>
			</Row>
			</center>
			)
		}	
		else if(userinfo.permission == 'Authentication credentials were not provided.'){
			return(
			<div>
				<center>
					<h1 style={{color:'red'}}>You did not sign in yet!! Redirecting to sign in...</h1>
					<Button type='primary' style={{width:'50%'}} onClick={this.redirect_to_login}>
					Redirect to login
					</Button>
				</center>
			</div>)
		}	
		else {
			return(<h1>Loading...</h1>)
		}
	}
}