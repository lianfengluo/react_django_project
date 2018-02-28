import React from 'react';
import { Row, Col } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button,Modal,Tooltip } from 'antd';
import ForgetErrorItem from '../errorItem'

const FormItem = Form.Item;

class EditNicknameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.temp_bind_signal = null;
	  this.redirect_to_login = this.redirect_to_login.bind(this);
	}
	
	componentWillReceiveProps(nextprops){
		if(nextprops.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		}
		if(this.temp_bind_signal != nextprops.changenickname.change_nickname_succeed){
			this.refs.change_nickname_succeed.style.display = 'block';
			this.temp_bind_signal = nextprops.changenickname.change_nickname_succeed;
			this.props.fetchUserInfo();
		}
	}
	componentDidMount(){
		if(this.props.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		} 
	}
	componentWillUnmount() {
        clearInterval(this.redirect_timer);//FIXME:无法实现卸载时清除计时器
    }
	SubmitNickname = (e) => {
	e.preventDefault();
	this.props.form.validateFields(['nickname','check_code'],(err, values) => {
		if (!err) {
			this.ChangeCode();
			this.props.form.setFieldsValue({'check_code':''})
		    this.props.editUserNickname(values);
		}
		})
	};
	redirect_to_login(){
		this.props.history.push('/user/login/username');
	}
	ChangeCode(){
	if (document.getElementById('captcha_img').src.indexOf("api/user/check_code") > 0){
		document.getElementById('captcha_img').src = document.getElementById('captcha_img').src + "?";
	}
	};
	GetCaptcha(){
	if (document.getElementById('captcha_img').src.indexOf("api/user/check_code") > 0){
	      document.getElementById('captcha_img').src = document.getElementById('captcha_img').src + "?";
	}else{
		document.getElementById('captcha_img').src = '/api/user/check_code';
	document.getElementById('captcha_img').alt = "CheckCode"
		document.getElementById('captcha_img').style.display = 'block';
	}
	};
	render(){
  	const { changenickname,userinfo } = this.props;
  	const { getFieldDecorator } = this.props.form;
  	if(userinfo.userinfo.user){
  	return(
		<div>
			<center>
			<h2 style={{marginBottom:'10px'}}>Change your nickname</h2>
			<Form autoComplete='off' onSubmit={this.SubmitNickname} className="login-form">
			<h3 style={{color:'red',display:'none'}} ref='change_nickname_succeed'>
			Change nickname success!!</h3>
		      <div>
		     <h3 style={{marginBottom:'10px'}}>Your nickname:<span style={{fontSize:'150%'}}>{userinfo.userinfo.nickname}</span></h3>
	        <FormItem>
	          {getFieldDecorator('nickname', {
	            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true },
	            {
	             pattern:/^.{4,20}$/,message: 'nickname should be 4 to 20 letters!',
	            },],

	          })(
	            <Input prefix={<Tooltip title="What do you want other to call you?">
	                <Icon type="question-circle-o" />
	              </Tooltip>} placeholder="New Nickname"/>
	          )}
	        </FormItem>
		    <FormItem extra="We must make sure that your are a human(not case sensitive).">
	          <Row gutter={8}>
	            <Col span={12}>
	              {getFieldDecorator('check_code', {
	                rules: [{ required: true, message: 'Please input the captcha you got!' },
	                {
	                pattern:/^\w{4}$/,message: 'Invalid captcha',
	            } ],
	              })(
	                <Input autoComplete='off' size="large" prefix={<Icon type="check-circle" />} placeholder="Captcha" />
	              )}
	            </Col>
	            <Col span={12} onClick={this.GetCaptcha}>
	              <Button size="large">Get captcha</Button>
	            </Col>
	          </Row>
			</FormItem>
			<img style={{display:'none'}}  src="" ref='captcha_img'
          		onClick={this.ChangeCode} style={{borderRadius:"3px",cursor:'pointer',marginBottom:'5px'}}/>
			<FormItem>
	          <Button type="primary" htmlType="submit" className="login-form-button">
	          <Icon type="check" />Change&nbsp;nickname
	          </Button>
        	</FormItem>
	         {changenickname.errors?(
	         <div id={'errors'}>
	          {changenickname.errors.map((error, i) => {
	            return <ForgetErrorItem
	              key={i}
	              error={error}
	            />
	          })}
		        </div>):
		        (<div></div>)
		        }
		        </div>
	  		</Form>
		<Link to='/user/profile/user_profile_center' className='back_to_profile_center'>Back to profile center</Link>
	  		</center>
  		</div>
		)}else if(userinfo.permission == 'Authentication credentials were not provided.'){
			return(
			<div>
			<center>
		  <h1 style={{color:'red'}}>You did not sign in yet!! Redirecting to sign in...</h1>
			<Button type='primary' style={{width:'50%'}} onClick={this.redirect_to_login}>
			Redirect to login
			</Button>
			</center>
			</div>)
		}else {
			return(<h1>Loading...</h1>)
		}
  	}
}
const WrappedEditNicknameForm = Form.create()(EditNicknameForm);
export default WrappedEditNicknameForm;