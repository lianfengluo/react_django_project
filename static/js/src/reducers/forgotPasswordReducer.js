const initalState = {
  reset_succeed: undefined,
  loading: false,
  errors: [],
  error: null,
};

function forgotPasswordReducer(state = initalState, action) {
	let reset_succeed;
	let errors = [];
	switch (action.type) {
    case 'RESET_PASSWORD_BY_MAIL_PENDING':
      return { ...state, loading: true };
    case 'RESET_PASSWORD_BY_MAIL_FULFILLED':
      reset_succeed = action.payload.data.reset_succeed;
      return { ...state, loading: false, reset_succeed,send_email_succeed: undefined };
    case 'RESET_PASSWORD_BY_MAIL_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: `${action.payload.message}`,errors };
    case 'INIT_FORGOT_PASSWORD_STATE':
      return initalState
    default:
      return state;
	}
}
export default forgotPasswordReducer;