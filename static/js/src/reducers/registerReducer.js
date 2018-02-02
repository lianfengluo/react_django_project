// Promise
// pending
// fulfilled
// rejected
const initalState = {
  register_success: false,
  errors: [],
  loading: false,
  error: null,
};

// REDCUER
function registerReducer(state = initalState, action) {
  let register_success;
  let errors=[];
  switch (action.type) {
    case 'REGISTER_PENDING':
      return { ...state, loading: true,errors: [] };
    case 'REGISTER_FULFILLED':
      register_success = action.payload.data.register_success;
      return { ...state, loading: false, register_success };
    case 'REGISTER_REJECTED':
      if(action.payload.response.data.errors){
        for(let key in action.payload.response.data.errors){
          console.log('errors',action.payload.response.data.errors[key])
          if (action.payload.response.data.errors[key] instanceof Array){
          action.payload.response.data.errors[key].map((val)=>{
              errors.push(val)})
          }
          else{
            for(let key2 in action.payload.response.data.errors[key]){
              action.payload.response.data.errors[key][key2].map((val)=>
              {errors.push(val)})
            }
          }
        }
      }
      return { ...state, loading: false, error: `${action.payload.message}`,errors };
    // case 'CHANGE_REGISTER_STATE':
    //   let register_success = action.payload
    //   return { ...state,  register_success };
    case 'INIT_REGISTER_STATE':
      return initalState
    default:
      return state;
  }
}

export default registerReducer;
