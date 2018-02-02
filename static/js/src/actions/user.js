// import axios from 'axios';
import my_axios from './myaxios.js';

export function register(data) {
  return {
    type: 'REGISTER',
    payload: my_axios('api/user/signup','POST',
      {'user.username':data.user.username,'user.password':data.user.password,
      'user.confirm_password':data.user.confirm_password,'user.email':data.user.email,
      'phone':data.phone,'check_code':data.check_code,
      'nickname':data.nickname})
  }
}
export function loginByUsername(data) {
  return {
    type: 'USER_LOGIN_BY_USERNAME',
    payload: my_axios('api/user/login/username','POST',data)
  }
}
export function loginByEmail(data) {
  return {
    type: 'USER_LOGIN_BY_EMAIL',
    payload: my_axios('api/user/login/email','POST',data)
  }
}
export function loginByPhone(data) {
  return {
    type: 'USER_LOGIN_BY_PHONE',
    payload: my_axios('api/user/login/phone','POST',data)
  }
}
export function initLoginState(data) {
  return {
    type: 'INIT_LOGIN_STATE',
    payload: null
  }
}
export function initRegisterState(data) {
  return {
    type: 'INIT_REGISTER_STATE',
    payload: null
  }
}
export function logout() {
  return {
    type: 'USER_LOGOUT',
    payload: my_axios('api/user/logout','GET',{})
  }
}
export function showsignupsucceed() {
  return {
    type: 'SHOW_SIGN_UP_SUCCEED',
    payload: null
  }
}
export function initFogotPasswordState(data) {
  return {
    type: 'INIT_FORGOT_PASSWORD_STATE',
    payload: null
  }
}
export function initSendMailState(data) {
  return {
    type: 'INIT_SEND_MAIL_STATE',
    payload: null
  }
}
export function sendmailcode(data) {
  return {
    type: 'SEND_MAIL_CODE',
    payload: my_axios('api/user/sendmail','POST',data)
  }
}
export function resetpasswordbymail(data) {
  return {
    type: 'RESET_PASSWORD_BY_MAIL',
    payload: my_axios('api/user/resetpasswordbymail','POST',data)
  }
}
// export function ChangeLoginState(data) {
//   return {
//     type: 'CHANGE_LOGIN_STATE',
//     payload: false
//   }
// }
// export function ChangeRegisterState(data) {
//   return {
//     type: 'CHANGE_REGISTER_STATE',
//     payload: false
//   }
// }

export function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user
  }
}