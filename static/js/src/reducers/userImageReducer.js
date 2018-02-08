const initalState = {
  new_img: null,
  loading: false,
  errors: [],
  error: null,
};
function userImageReducer(state = initalState, action) {
	let new_img;
	let errors=[];
	switch (action.type) {
	case 'UPLOAD_USER_IMAGE_PENDING':
	  return { ...state, loading: true,errors: [] };
	case 'UPLOAD_USER_IMAGE_FULFILLED':
	  new_img = action.payload.data.new_img;
	  return { ...state, loading: false, new_img };
	case 'UPLOAD_USER_IMAGE_REJECTED':
      if(action.payload.response.data.errors){
        Object.values(action.payload.response.data.errors).map(val => errors.push(val))
      }
	  return { ...state, loading: false, error: `${action.payload.message}`, errors};
	// case 'CHANGE_REGISTER_STATE':
	//   let register_success = action.payload
	//   return { ...state,  register_success };
	case 'INIT_USER_IMAGE_STATE':
	  return initalState
	default:
	  return state;
	}
}
export default userImageReducer;