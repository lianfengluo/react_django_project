import my_axios from './myaxios.js';

export function fetchUserInfo() {
  return {
    type: 'FETCH_USER',
    // payload: axios.get('/api/user/fetchuserinfo')
    payload: my_axios('/api/user/fetchuserinfo','GET')
  };
}