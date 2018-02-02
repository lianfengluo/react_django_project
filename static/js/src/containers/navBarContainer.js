import { connect } from 'react-redux';
import NavBar from '../components/navBar/navBar';
import { fetchUserInfo } from '../actions/fetchUserInfo'
import { logout,initLoginState,initRegisterState,
      initFogotPasswordState,initSendMailState } from '../actions/user'
import { initUserImageState,initEditUserEmailState,initUserNicknameState } from '../actions/userProfile'
// import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  userinfo: state.fetchUserInfoReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchUserInfo())
    },
    logout: () => {
      dispatch(logout())
    },
    initLoginState: () => {
      dispatch(initLoginState())
    },
    initRegisterState: () => {
      dispatch(initRegisterState())
    },
    initFogotPasswordState: () =>{
      dispatch(initFogotPasswordState())
    },
    initSendMailState: () =>{
      dispatch(initSendMailState())
    },
    initUserImageState: () =>{
      dispatch(initUserImageState())
    },
    initEditUserEmailState: () =>{
      dispatch(initEditUserEmailState())
    },
    initUserNicknameState: () =>{
      dispatch(initUserNicknameState())
    }
  }
}


const NavContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar));

export default NavContainer;