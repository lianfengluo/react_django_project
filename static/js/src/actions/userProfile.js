import my_axios from './myaxios.js';

export function upload_user_image(data) {
	return{
		type:'UPLOAD_USER_IMAGE',
		payload: my_axios('api/user/userimageupload','POST',data,(data)=>{return data})
	}
}
export function initUserImageState(data) {
	return{
		type:'INIT_USER_IMAGE_STATE',
		payload: null
	}
}
export function bindUserEmail(data) {
	return{
		type:'BIND_USER_EMAIL',
		payload: my_axios('api/user/binduseremail','POST',data)
	}
}
export function initEditUserEmailState(data) {
  return {
    type: 'INIT_EDIT_USER_EMAIL_STATE',
    payload: null
  }
}
export function initUserNicknameState(data) {
	return{
		type:'INIT_USER_NICKNAME_STATE',
		payload: null
	}
}
export function editUserNickname(data) {
	return{
		type:'EDIT_USER_NICKNAME',
		payload: my_axios('api/user/updateusernickname','POST',data)
	}
}