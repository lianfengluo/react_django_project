import React from 'react';
import { Row, Col } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button,Modal } from 'antd';
import ForgetErrorItem from '../errorItem'

const FormItem = Form.Item;

class EditEmailForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {visible:false};
	  this.temp_bind_signal = null;
	  this.redirect_to_login = this.redirect_to_login.bind(this);
	}
	showModal = () => {
    this.setState({
      visible: true,
    });
    this.props.form.setFieldsValue({'show_email':this.props.form.getFieldValue('email')});
	};
	handleCancel = (e) => {
	this.setState({
	  visible: false,
	});
	};
	SubmitSendMail = (e) => {
	e.preventDefault();
	this.refs.bind_email_success.style.display = 'none';
	this.props.form.validateFields(['email','show_email','check_code'],(err, values) => {
		if (!err) {
			this.props.form.setFieldsValue({'check_code':''})
		    this.props.sendmailcode(values);
		    this.ChangeCode();
		    this.setState({visible: false});
		}
		})
	};
	SubmitBindEmail = (e) => {
	e.preventDefault();
	this.props.form.validateFields(['email','email_verification_code'],(err, values) => {
		// console.log(values)
		if (!err) {
		    this.props.initSendMailState();
		    this.props.bindUserEmail(values);
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
	componentWillReceiveProps(nextprops){
		if(nextprops.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		}
		if(this.temp_bind_signal != nextprops.bindemail.edit_succeed){
			this.refs.bind_email_success.style.display = 'block';
			this.temp_bind_signal = nextprops.bindemail.edit_succeed;
			this.props.form.setFieldsValue({'email':nextprops.bindemail.edit_succeed})
			this.props.fetchUserInfo();
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
  	const { sendemail,bindemail,userinfo } = this.props;
  	const { getFieldDecorator } = this.props.form;
  	if(userinfo.userinfo.user){
  	return(
		<div>
			<center>
			<h2 style={{marginBottom:'10px'}}>Bind your user email</h2>
				<Form autoComplete='off' onSubmit={this.SubmitBindEmail} className="login-form">
			<h3 style={{color:'red',display:'none'}} ref='bind_email_success'>
			Bind E-mail success!!</h3>
			<div style={{color:'red'}}>{sendemail.send_email_succeed}</div>
					<FormItem>
	          {getFieldDecorator('email', {
	            rules: [{
	              type: 'email', message: 'The input is not valid E-mail!',
	            }, {
	              required: true, message: 'Please input your E-mail!',
	            }],
	          })(
	            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="New E-mail" />
	          )}
	        </FormItem>
		      <div>
		      <FormItem extra="Please input the verification code we send to your email(case sensitive).">
		      	<Row gutter={8}>
			            <Col span={12}>
			              {getFieldDecorator('email_verification_code', {
			                rules: [{ required: true, message: 'Please input the verification code you got!' },
			                {
			                pattern:/^\w{6}$/,message: 'Invalid verification code',
			            } ],
			              })(
			                <Input size="large" prefix={<Icon type="check-circle" />} placeholder="Verification code" />
			              )}
			            </Col>
			            <Col span={12}>
			              <Button onClick={this.showModal}>send mail</Button>
			            </Col>
			      </Row>
			      <label style={{color:'red'}} htmlFor="email_verification_code">The code only validated in 300s</label>
		      </FormItem>
		        <Modal
		        wrapClassName='send-mail-modal'
		          title="Verify Modal"
		          visible={this.state.visible}
		          onOk={this.SubmitSendMail}
		          onCancel={this.handleCancel}
		          okText='submit'
		          cancelText='cancel'
		        >
				<FormItem>
		          {getFieldDecorator('show_email', {
		            rules: [{
		              type: 'email', message: 'The input is not valid E-mail!',
		            }, {
		              required: true, message: 'Please input your E-mail!',
		            }],
		          })(
		            <Input style={{width:'50%'}} disabled="disabled" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="E-mail" />
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
	          <img style={{display:'none'}}  src="" id='captcha_img'
	          		onClick={this.ChangeCode} style={{borderRadius:"3px",cursor:'pointer',marginBottom:'5px'}}/>
		        </Modal>
		      </div>
			<FormItem>
	          <Button type="primary" htmlType="submit" className="login-form-button">
	          {sendemail.errors[0]=='Sending the message...'?(<span><Icon type="loading" />
	          	&nbsp;Sending...</span>):(<span><Icon type="check" />Bind&nbsp;E-mail</span>)}
	          </Button>
        	</FormItem>
	        {bindemail.errors?(
				<div id={'errors'}>
				{bindemail.errors.map((error, i) => {
				return <ForgetErrorItem
				  key={i}
				  error={error}
				/>
				})}</div>):
				(<div></div>)
		    }
	        {sendemail.errors?(
	         <div id={'errors'}>
	          {sendemail.errors.map((error, i) => {
	            return <ForgetErrorItem
	              key={i}
	              error={error}
	            />
	          })}
		        </div>):
		        (<div></div>)
		    }
	  		</Form>
		<Link to='/user/profile/user_profile_center' className='back_to_profile_center'>
		Back to profile center</Link>
  			</center>
  		</div>)
	}else if(userinfo.permission == 'Authentication credentials were not provided.'){
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
const WrappedEditEmailForm = Form.create()(EditEmailForm);
export default WrappedEditEmailForm;