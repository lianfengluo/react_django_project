const initalState = {
  edit_succeed: null,
  loading: false,
  errors: [],
  error: null,
};
function editEmailReducer(state = initalState, action) {
	let edit_succeed;
	let errors = [];
	switch (action.type) {
    case 'BIND_USER_EMAIL_PENDING':
      return { ...state, loading: true ,errors:[]};
    case 'BIND_USER_EMAIL_FULFILLED':
      edit_succeed = action.payload.data.edit_succeed;
      return { ...state, loading: false, edit_succeed,send_email_succeed: undefined };
    case 'BIND_USER_EMAIL_REJECTED':
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
export default editEmailReducer;