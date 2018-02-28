// Promise
// pending
// fulfilled
// rejected
const initalState = {
  login_success: undefined,
  loading: false,
  errors: [],
  error: null,
  sign_up_info:'',
};

// REDCUER
function loginReducer(state = initalState, action) {
  let login_success;
  let errors = [];
  switch (action.type) {
    // case 'SIGN_UP_SUCCESS':
    //   return { ...state, sign_up_success:true }
    // login by username
    case 'USER_LOGIN_BY_USERNAME_PENDING':
      return { ...state, loading: true,sign_up_info:'',errors: [] };
    case 'USER_LOGIN_BY_USERNAME_FULFILLED':
      login_success = action.payload.data.login_success;
      return { ...state, loading: false, login_success };
    case 'USER_LOGIN_BY_USERNAME_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: action.payload.message,errors };
    // log by email
    case 'USER_LOGIN_BY_EMAIL_PENDING':
      return { ...state, loading: true,sign_up_info:'',errors: [] };
    case 'USER_LOGIN_BY_EMAIL_FULFILLED':
      login_success = action.payload.data.login_success;
      return { ...state, loading: false, login_success };
    case 'USER_LOGIN_BY_EMAIL_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: action.payload.message,errors };

    //log by phone
    case 'USER_LOGIN_BY_PHONE_PENDING':
      return { ...state, loading: true,sign_up_info:'',errors: [] };
    case 'USER_LOGIN_BY_PHONE_FULFILLED':
      login_success = action.payload.data.login_success;
      return { ...state, loading: false, login_success };
    case 'USER_LOGIN_BY_PHONE_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: action.payload.message,errors };
    // case 'CHANGE_LOGIN_STATE':
    //   return { ...state, login_success:`${action.payload}`,sign_up_info: 'sign up succeed' };
    case 'SHOW_SIGN_UP_SUCCEED':
      return { ...state, sign_up_info:'Sign up succeed' }
    case 'INIT_LOGIN_STATE':
      return initalState
    default:
      return state;
  }
}

export default loginReducer;