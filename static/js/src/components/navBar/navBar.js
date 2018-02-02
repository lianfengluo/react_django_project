import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown, Icon,Button } from 'antd';

export default class NavBarComp extends React.Component {
// const NavBarComp = (props) => {
	// console.log(props)
	constructor(props) {
	  super(props);
	  this.gotoprofilecenter = this.gotoprofilecenter.bind(this);
	}
	gotoprofilecenter(){
		if(this.props.location.pathname != "/user/profile/user_profile_center"){
		this.props.history.push('/user/profile/user_profile_center')
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname != this.props.location.pathname) {
			if(this.props.location.pathname.indexOf("/user/login") > -1  ){  
			  this.props.initLoginState();
			  if(document.getElementById('nav_sign_in_id')!=null){
			  document.getElementById('nav_sign_in_id').className = 'nav_hover';}
			} else if(this.props.location.pathname == "/user/register" ){  
			  this.props.initRegisterState();
			} else if(this.props.location.pathname == "/user/forgot_password" ){  
			  this.props.initFogotPasswordState();
			  this.props.initSendMailState();
			}else if(this.props.location.pathname == "/user/profile/edit_image" ){  
			  this.props.initUserImageState();
			}else if(this.props.location.pathname == "/user/profile/edit_user_email" ){  
			this.props.initSendMailState();
			this.props.initEditUserEmailState();
			}else if(this.props.location.pathname == "/user/profile/edit_user_nickname" ){  
			this.props.initUserNicknameState();
			}


		}
	}
	componentWillMount(){
		this.props.fetchUserInfo()
	}
	render(){
	const { userinfo } = this.props.userinfo;
	const { logout } = this.props;
	const menu = (
		<Menu>
		{userinfo.user?(
		<center onMouseOver={
			()=>{document.getElementsByClassName('drop_down_tap')[0].style.color = '#FFFFFF'}
				} onMouseOut={
			()=>{document.getElementsByClassName('drop_down_tap')[0].style.color = 'rgba(255, 255, 255, 0.65)'}
				}>
		  <div className='nav_user_menu'>
				<div className='user_logout'>
					<a onClick={logout} href="javascript:void(0);"><Icon type="logout" />logout</a>
				</div>
				<Link to='/user/profile/edit_image' >
				<img className='user_image_profile_link' src={userinfo.image} alt='Your img'/>
				</Link>
					<br/>
			<div>
			  <p>
			  <Icon type="exclamation-circle" />
			  username:<span>{userinfo.user.username}</span>
			  </p>
			  {userinfo.user.email?(
				<p>
			  <Icon type="mail" />E-mail:<span>{userinfo.user.email}</span>
			  </p>
			  	):(<div></div>)}
			  {userinfo.phone?(
			  <p>
			  <Icon type="phone" />Phone Number:<span>{userinfo.phone}</span>
			  </p>
			  	):(<div></div>)}

			</div>
			<hr style={{color:'grey'}}/>
			<div onClick={this.gotoprofilecenter} className='go_to_profile_center'>
				<Icon type="setting" />Profile Center
			</div>
		  </div>  
		</center>
		):(<div></div>)}
		
		</Menu>
	)
	return(
	    <nav style={{fontSize:"12px"}}>
	    <Row align="top" type="flex" justify="center">
		    <Col span={10} style={{marginTop:'6px'}}>
		      <div className="logo"  >
		      	Whatever logo you like
		      </div>
		    </Col>
		    <Col span={14} style={{marginTop:'6px'}}>
			<Col span={8}>
				<center>
		        <NavLink className='nav_hover' style={{fontSize:'19px'}} exact activeClassName="nav_active" to='/'>
		      		<Icon type="home" />Home
		    	</NavLink>
		    	</center>
			</Col>

			<Col span={8} push={8}>
			<center>
			{ userinfo.user ? 
				(<Dropdown overlay={menu}>
					<div className='drop_down_tap' onMouseOver={
			()=>{document.getElementsByClassName('drop_down_tap')[0].style.color = '#FFFFFF'}
				} onMouseOut={
			()=>{document.getElementsByClassName('drop_down_tap')[0].style.color = 'rgba(255, 255, 255, 0.65)'}
				}>
				<center>
					<div>
					<img style={{height:'28px',width:'28px',borderRadius:'50%'}} src={userinfo.image} alt='Your img'/>
					</div>
					<div>
					&nbsp;&nbsp;&nbsp;
					<Icon type="user" />
					{userinfo.nickname}
					<Icon type="down" />
					</div>
				</center>
				 	</div>
			 	</Dropdown>)
			 :(<div style={{marginTop:'0px'}}>
			 	<NavLink className='nav_hover' id='nav_sign_in_id' to='/user/login/username'>
			     Sign&nbsp;in
			    </NavLink>
			    /
			    <NavLink className='nav_hover' activeClassName="nav_active" to='/user/register'>
			     Sign&nbsp;up
			    </NavLink>
			    </div>)
			}    
			</center>
			</Col>
		    </Col>
	    </Row>
	    </nav>
	  )
	}

}



// export default NavBarComp;