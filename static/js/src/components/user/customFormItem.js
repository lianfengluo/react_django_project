import React from 'react';
import { Form,Input,Icon } from 'antd';

const FormItem = Form.Item;

const MyFormItem = (props) =>{if(props.currentway=='email') return(
        <FormItem>
          {props.getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="E-mail" />
          )}
        </FormItem>
	) 
	else if(props.currentway=='phone') return(
        <FormItem>
          {props.getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
            {
             pattern:/^(\d|-){6,30}$/,message: 'phone number should be 6 to 30 number!',
            }],
          })(
            <Input prefix={<Icon type="phone" />} placeholder='Phone Number' />
          )}
        </FormItem>
	)
	else if(props.currentway=='username') return(
        <FormItem>
          {props.getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your Username!',
            },{
            pattern:/^\w{6,30}$/,message: 'Username should be 6 to 30 letters!',
            }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
		)}

export default MyFormItem;