import React from 'react';
import { Row, Col } from 'antd';
import { Form, Icon, Input, Button,Tooltip } from 'antd';
import { Redirect,Link } from 'react-router-dom';
import ErrorItem from '../errorItem';

const FormItem = Form.Item;
class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.ChangeCode();
        this.props.form.setFieldsValue({'check_code':''})
        // values = Object.assign({}, values, {csrfmiddlewaretoken:document.getElementsByName('csrfmiddlewaretoken')[0].value})
        this.props.register(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('user.password')) {
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { ChangeRegisterState,info } = this.props;
    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 24, push:3 },
      //   sm: { span: 6, push:0 },
      //   md: { span: 6, push:0 },
      //   lg: { span: 6, push:0 },
      // },
      wrapperCol: {
        xs: { span: 18, push:3 },
        sm: { span: 16, push:4 },
        md: { span: 16, push:4 },
        lg: { span: 16, push:4 },
      },
    };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 14,
    //       offset: 6,
    //     },
    //   },
    // };

    if(!info.register_success){
    return (
      <center>
      <Form className='register_form' onSubmit={this.handleSubmit} style={{maxWidth:'500px',margin:'0px 12%'}} autoComplete='off'>
        <Col span={24}>
        <h2 style={{marginBottom:'10px'}}>Sign Up</h2>
        </Col>
        <FormItem
          {...formItemLayout}
          // label="Username"
          hasFeedback
        >
          {getFieldDecorator('user.username', {
            rules: [{
              required: true, message: 'Please input your Username!',
            },{
            pattern:/^\w{6,30}$/,message: 'Username should be 6 to 30 letters!',
            }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
       {/* <FormItem
          {...formItemLayout}
          // label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('user.email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="E-mail" />
          )}
        </FormItem>*/}
        <FormItem
          {...formItemLayout}
          // label="Password"
          hasFeedback
        >
          {getFieldDecorator('user.password', {
            rules: [{
              required: true, message: 'Please input your password!',
            },{
             pattern:/^\w{6,30}$/,message: 'Password should be 6 to 30 letters!',
            },{
              validator: this.checkConfirm,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          // label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('user.confirm_password', {
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
        <FormItem
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true },
            {
             pattern:/^.{4,20}$/,message: 'nickname should be 4 to 20 letters!',
            },],

          })(
            <Input prefix={<Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>} placeholder="Nickname"/>
          )}
        </FormItem>
        {/*<FormItem
          {...formItemLayout}
          // label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
            {
             pattern:/^(\d|-){6,30}$/,message: 'phone number should be 6 to 30 number!',
            }],
          })(
            <Input prefix={<Icon type="phone" />} placeholder='Phone Number' />
          )}
        </FormItem>*/}
        <FormItem
          {...formItemLayout}
          // label="Captcha"
          extra="We must make sure that your are a human(not case sensitive)."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('check_code', {
                rules: [{ required: true, message: 'Please input the captcha you got!' },
                {
                pattern:/^\w{4}$/,message: 'Invalid captcha',
            } ],
              })(
                <Input size="large" prefix={<Icon type="check-circle" />} placeholder="Captcha" />
              )}
            </Col>
            <Col span={12} onClick={this.GetCaptcha}>
              <Button size="large">Get captcha</Button>
            </Col>
          </Row>
        </FormItem>
          <img style={{display:'none'}}  src="" id='captcha_img'
          		onClick={this.ChangeCode} style={{borderRadius:"3px",cursor:'pointer',marginBottom:'5px'}}/>
        {/*<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>*/}
        <FormItem {...formItemLayout}>
          <Button type="primary" htmlType="submit" className='register_submit_button'>Sign up</Button>
          <br/>
          <Link to='/user/login' className='my_custom_link'>Back to sign in!</Link>
        </FormItem>
      {info.errors?(
         <div id={'errors'}>
          {info.errors.map((error, i) => {
            return <ErrorItem
              key={i}
              error={error}
            />
          })}
        </div>):
        (<div></div>)
        }
      </Form>
      </center>
    )}
    else {
      this.props.initRegisterState();
      this.props.showsignupsucceed();
      return(<Redirect to={'/user/login/username'}/>)
    }
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;