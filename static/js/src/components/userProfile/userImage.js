import React from 'react';
import { Form,Input,Button,Icon } from 'antd';
import { Redirect,Link } from 'react-router-dom';
import ErrorItem from '../errorItem';
const FormItem = Form.Item;
class UserImageForm extends React.Component {
	constructor(props) {
		super(props);
		this.setImagePreview = this.setImagePreview.bind(this);
		this.upload_img_function = this.upload_img_function.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.redirect_to_login = this.redirect_to_login.bind(this);
		this.temp_img_src=null;
	}
	handleSubmit(e){
		e.preventDefault();
		this.refs.font_edge_error.style.display = 'none';
		this.refs.user_img_submit_success.style.display = 'none';
	 	let data = new FormData();
	 	if(this.refs.upload_img_input.files[0]){
		 	data.append("image", this.refs.upload_img_input.files[0]); 
			this.props.upload_user_image(data);}
		else{
			this.refs.font_edge_error.style.display = 'block'
		}
	};
	upload_img_function(){
		var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false; 
	　　if(ie){ 
	　　　　this.refs.upload_img_input.click()
	　　}else{
	　　　　let a=document.createEvent("MouseEvents");
	　　　　a.initEvent("click", true, true);  
	　　　　this.refs.upload_img_input.dispatchEvent(a); 
		}
	}
	setImagePreview(e){
		let docObj=this.refs.upload_img_input;
		let imgObjPreview=this.refs.user_preview;
		if(docObj.files &&docObj.files[0])
		{
			//firefox setting style
			imgObjPreview.style.display = 'block';
			imgObjPreview.style.width = '200px';
			imgObjPreview.style.height = '200px'; 
			imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
			return true;
		}
		else
		{
			//IE use filter
			docObj.select();
			let imgSrc = document.selection.createRange().text;
			// let localImagId = document.getElementById("my_Imag");
			let localImagId = this.refs.my_Image_div;
			//init size
			localImagId.style.width = "200px";
			localImagId.style.height = "200px";
		try{
			localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		}
		catch(e)
		{
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
		}
		imgObjPreview.style.display = 'none';
	}
	redirect_to_login(){
		this.props.history.push('/user/login/username');
	}
	componentWillReceiveProps(nextprops){
		if(nextprops.userinfo.permission == 'Authentication credentials were not provided.'){
			this.redirect_timer = setInterval(()=>{this.props.history.push('/user/login/username');},2000);
		}
		if(this.temp_img_src != nextprops.new_img.new_img){
			this.refs.user_img_submit_success.style.display = 'block';
			this.temp_img_src = nextprops.new_img.new_img;
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
		const { getFieldDecorator } = this.props.form;
		const { new_img,userinfo } = this.props;

		if (userinfo.userinfo.user){
		return(
		<center>
		<form id='user_img_submit' onSubmit={this.handleSubmit} ref='user_img_submit'>
			<h3>Change your user image.</h3>
			<h3 style={{color:'red',display:'none'}} ref='user_img_submit_success'>
			Change success!!</h3>
				<div ref='my_Image_div' className='user_profile_img_area'>
				<div>
					<div className='user_orgin_img'>
					<img alt='user orginal image' ref='user_orgin_img' src={userinfo.userinfo.image} />
					<div>
					<p>Your user image</p>
					</div>
					</div>
					<div alt='user preview image' className='user_preview_img'>
					<img ref="user_preview" src=""/>
					<div>
					<p>Preview user image</p>
						<label htmlFor="image" style={{color:'red'}}>The size of image must less than 120kb.</label><br/>
						<label htmlFor="image" style={{color:'red'}}>must be bmp,gif,jpeg or png.</label>
					</div>

					<div className='user_upload_img_button' >
					<Button onClick={this.upload_img_function}>
						<Icon type="upload" />
						 Upload your image
			    	</Button>
				        <div>
			    			<input id='upload_img_input' type="file" style={{display:'none'}} name="image" ref='upload_img_input' onChange={this.setImagePreview}/>
			    		</div>
			    		
						{/*<Button type="primary" onClick={this.upload_img_function}>
						 Upload your image
			    		</Button>*/}
			    	</div>
					</div>
				</div>
				</div>

	    		
          <Button type="primary" htmlType="submit" style={{width:'25%'}}><Icon type='check'/>Submit Change</Button>
          <div ref='font_edge_error' style={{color:'red',display:'none'}}>
          <p>Please upload your image!</p>
          </div>
      {new_img.errors?(
         <div id={'errors'}>
          {new_img.errors.map((error, i) => {
            return <ErrorItem
              key={i}
              error={error}
            />
          })}
        </div>):
        (<div></div>)
        }
	  </form>
	  	  <br/>
	  <Link to='/user/profile/user_profile_center' className='back_to_profile_center'>Back to profile center</Link>
		</center>
	  )}else if(userinfo.permission == 'Authentication credentials were not provided.')
		{return(
	  	<div>
	  	<center>
	  <h1 style={{color:'red'}}>You did not sign in yet!! Redirecting to sign in...</h1>
					<Button type='primary' style={{width:'50%'}} onClick={this.redirect_to_login}>
					Redirect to login
					</Button>
		</center>
		</div>)
	}else{return(<h1>Loading...</h1>)}
	}
}
const WrappedUserImageForm = Form.create()(UserImageForm);
export default WrappedUserImageForm;