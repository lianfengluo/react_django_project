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
        Object.values(action.payload.response.data.errors).map(top_val => {
          if(top_val instanceof Array) {
            top_val.map( (val)=>{errors.push(val)})
          }
        })
      } else {
          // top_val is object
          Object.values(action.payload.response.data.errors[key]).map(val => errors.push(val))
      }
      return { ...state, loading: false, error: `${action.payload.message}`,errors };
    case 'INIT_REGISTER_STATE':
      return initalState
    default:
      return state;
  }
}

export default registerReducer;
