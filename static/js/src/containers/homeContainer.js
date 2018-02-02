import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/home';

const mapStateToProps = (state) => ({
  // userinfo: state.fetchUser,
})
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserInfo: () => {
    //   dispatch(fetchUserInfo())
    // },
    // logout: () => {
    //   dispatch(logout())
    // },
    // initLoginState: () => {
    //   dispatch(initLoginState())
    // },
    // initRegisterState: () => {
    //   dispatch(initRegisterState())
    // },

  }
}


const NavContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));

export default NavContainer;