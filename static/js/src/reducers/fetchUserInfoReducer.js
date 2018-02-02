// Promise
// pending
// fulfilled
// rejected
const initalState = {
  userinfo: {},
  permission: null,
  loading: false,
  error: null,

};

// REDCUER
function fetchUserReducer(state = initalState, action) {
  let userinfo;
  let permission;
  switch (action.type) {
    case 'FETCH_USER_PENDING':
      return { ...state, loading: true, permission:null };
    case 'FETCH_USER_FULFILLED':
      userinfo = action.payload.data
      return { ...state, loading: false, userinfo };
    case 'FETCH_USER_REJECTED':
      permission = action.payload.response.data.detail
      return { ...state, loading: false, error: `${action.payload.message}`,permission };
    case 'USER_LOGOUT_PENDING':
      return { ...state, loading: true };
    case 'USER_LOGOUT_FULFILLED':
      permission = 'Authentication credentials were not provided.';
      return { ...state, loading: false, userinfo:{},permission };
    case 'USER_LOGOUT_REJECTED':
      return { ...state, loading: false, error: `${action.payload.message}` };
    default:
      return state;
  }
}

export default fetchUserReducer;
