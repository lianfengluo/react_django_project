const initalState = {
  change_nickname_succeed: null,
  loading: false,
  errors: [],
  error: null,
};
function editNicknameReducer(state = initalState, action) {
	let change_nickname_succeed;
	let errors = [];
	switch (action.type) {
    case 'EDIT_USER_NICKNAME_PENDING':
      return { ...state, loading: true ,errors:[]};
    case 'EDIT_USER_NICKNAME_FULFILLED':
      change_nickname_succeed = action.payload.data.change_nickname_succeed;
      return { ...state, loading: false, change_nickname_succeed,send_email_succeed: undefined };
    case 'EDIT_USER_NICKNAME_REJECTED':
      if(action.payload.response.data.errors){
        for(let key in action.payload.response.data.errors){
          action.payload.response.data.errors[key].map((val)=>{
            errors.push(val)
          })
        }
      }
      return { ...state, loading: false, error: `${action.payload.message}`,errors };
    case 'INIT_EDIT_USER_EMAIL_STATE':
      return initalState
    default:
      return state;
	}
}
export default editNicknameReducer;