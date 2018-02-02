const initalState = {
  data: undefined,
  loading: false,
  error: null,
};

function post(state = initalState, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
}

export default post;