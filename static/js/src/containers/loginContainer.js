import { connect } from 'react-redux';
import Login from '../components/user/loginPage';
import { withRouter } from 'react-router-dom';
import { loginByUsername,loginByPhone,loginByEmail,initLoginState } from '../actions/user';
import { fetchUserInfo } from '../actions/fetchUserInfo'

const mapStateToProps = (state) => ({
  info: state.loginReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
    loginByUsername: (data) => {
      dispatch(loginByUsername(data))
    },
    loginByEmail: (data) => {
      dispatch(loginByEmail(data))
    },
    loginByPhone: (data) => {
      dispatch(loginByPhone(data))
    },
    initLoginState: () => {
      dispatch(initLoginState())
    },
    fetchUserInfo:() =>{
      dispatch(fetchUserInfo())
    }
  }
}


const LoginContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));

export default LoginContainer;