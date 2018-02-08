const initalState = {
  send_email_succeed: undefined,
  loading: false,
  errors: [],
  error: null,
};

function sendEmailReducer(state = initalState, action) {
  let send_email_succeed;
	let errors = [];
	switch (action.type) {
    case 'SEND_MAIL_CODE_PENDING':
      return { ...state, loading: true,errors: ['Sending the message...'],send_email_succeed:undefined };
    case 'SEND_MAIL_CODE_FULFILLED':
      send_email_succeed = action.payload.data.send_email_succeed;

      return { ...state, loading: false,send_email_succeed,errors: []};
    case 'SEND_MAIL_CODE_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: `${action.payload.message}`, errors  };
    case 'INIT_SEND_MAIL_STATE':
      return initalState
    default:
      return state;
  }
}
export default sendEmailReducer;