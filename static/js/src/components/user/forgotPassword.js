import React from 'react';
import { Row, Col } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button,Modal } from 'antd';
import ForgetErrorItem from '../errorItem'

const FormItem = Form.Item;
class ForgetPasswordForm extends React.Component {
  state = { visible: false,confirmDirty: false, };
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
    this.props.form.validateFields(['email','show_email','check_code'],(err, values) => {
    	if (!err) {
    		this.props.form.setFieldsValue({'check_code':''})
		    this.props.sendmailcode(values);
		    this.ChangeCode();
		    this.setState({visible: false});
    	}
  	})
  };
  SubmitResetPass = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['email','email_verification_code','password','confirm_password'],(err, values) => {
    	if (!err) {
    		this.props.initSendMailState();
		    this.props.resetpasswordbymail(values);
    	}
  	})
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

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
  	const { info,sendemail } = this.props;
  	const { getFieldDecorator } = this.props.form;
  	return(
  		<div>
			<center>
			<h2 style={{marginBottom:'10px'}}>RESET PASSWORD(BY EMAIL)</h2>
			<div style={{color:'red'}}>{info.reset_succeed}</div>
			<div style={{color:'red'}}>{sendemail.send_email_succeed}</div>
				<Form autoComplete='off' onSubmit={this.SubmitResetPass} className="login-form">
					<FormItem>
	          {getFieldDecorator('email', {
	            rules: [{
	              type: 'email', message: 'The input is not valid E-mail!',
	            }, {
	              required: true, message: 'Please input your E-mail!',
	            }],
	          })(
	            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="E-mail" />
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
			<FormItem hasFeedback>
	          {getFieldDecorator('password', {
	            rules: [{
	              required: true, message: 'Please input your new password!',
	            },{
	             pattern:/^\w{6,30}$/,message: 'Password should be 6 to 30 letters!',
	            },{
	              validator: this.checkConfirm,
	            }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Your New Password" />
	          )}
	        </FormItem>
	        <FormItem
	          hasFeedback
	        >
	          {getFieldDecorator('confirm_password', {
	            rules: [{
	              required: true, message: 'Please confirm your password!',
	            },{
	             pattern:/^\w{6,30}$/,message: 'Password should be 6 to 30 letters!',
	            }, {
	              validator: this.checkPassword,
	            }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm password" onBlur={this.handleConfirmBlur}  />
	          )}
	        </FormItem>

			<FormItem>
	          <Button type="primary" htmlType="submit" className="login-form-button">
{sendemail.errors[0]=='Sending the message...'?(<span><Icon type="loading" />&nbsp;
	          	Sending...</span>):(<span><Icon type="login" />&nbsp;reset&nbsp;password</span>)}
	          </Button>
        	<Link to='/user/login/username' className='my_custom_link'>Back to login!</Link>
        	</FormItem>
	         {info.errors?(
	         <div id={'errors'}>
	          {info.errors.map((error, i) => {
	            return <ForgetErrorItem
	              key={i}
	              error={error}
	            />
	          })}
		        </div>):
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
  			</center>
  		</div>
  	)
  }
}
const WrappedForgetPasswordForm = Form.create()(ForgetPasswordForm);
export default WrappedForgetPasswordForm;