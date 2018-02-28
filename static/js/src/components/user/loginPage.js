import React from 'react';
import { Row, Col,Form, Icon, Input, Button } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import ErrorItem from '../errorItem';
import SwitchLoginWays from './switchLoginWays'
import CustomFormItem from './customFormItem'


const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.match.params.login_way == 'username'){
        this.props.loginByUsername(values);
        } else if(this.props.match.params.login_way == 'phone'){
        this.props.loginByPhone(values);
        } else if(this.props.match.params.login_way == 'email'){
        this.props.loginByEmail(values);
        }
      }
    });
  }
  componentWillReceiveProps(nextProps){
  if(document.getElementById("nav_sign_in_id")!=null){
  document.getElementById("nav_sign_in_id").className = 'nav_active';
  }
  }
  componentDidMount(){
  if(document.getElementById("nav_sign_in_id")!=null){
  document.getElementById("nav_sign_in_id").className = 'nav_active';
  }
  }
  render() {
  	const { info,fetchUserInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    if(this.props.match.params.login_way != 'username'
      &&this.props.match.params.login_way != 'phone'
      &&this.props.match.params.login_way != 'email'){
      return(<Redirect to={'/user/login/username'}/>)
    }
    if(!info.login_success){
      return (
      <div>
        <center>
          <Form autoComplete='off' onSubmit={this.handleSubmit} className="login-form">
            <SwitchLoginWays currentway={this.props.match.params.login_way}/>
            <h2 style={{marginBottom:'10px'}}>Sign&nbsp;in(by <span className='login_method_font'>
              {this.props.match.params.login_way}</span>)</h2>
             <div><h3 style={{color:"red"}}>{info.sign_up_info}</h3></div>
              <CustomFormItem currentway={this.props.match.params.login_way} getFieldDecorator={getFieldDecorator}/>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' },
                  { pattern:/^.{6,30}$/, message: 'Password should be 6 to 30 letters!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <div className="login-form-forgot">
                <Link 
                to="/user/forgot_password">Forgot password</Link>
              </div>
              <FormItem>
                {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
                <Button type="primary" htmlType="submit" className="login-form-button">
                <Icon type="login" />Sign&nbsp;in
                </Button>
                Or <Link to='/user/register' className='my_custom_link'>Sign up now!</Link>
              </FormItem>
      		    {info.errors?(
               <div id={'errors'}>
                {info.errors.map((error) => {
                  return <ErrorItem
                    key={error.toString()}
                    error={error}
                  />
                })}
              </div>):
              (<div></div>)
              }
          </Form>
        </center>
      </div>
    );}
    else{
    this.props.initLoginState();
		fetchUserInfo();
		return(<Redirect to={'/'}/>);
    }
  }
}

const WrappedlLoginForm = Form.create()(LoginForm);

export default WrappedlLoginForm;