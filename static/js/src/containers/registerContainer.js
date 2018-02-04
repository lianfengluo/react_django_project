import { connect } from 'react-redux';
import Register from '../components/user/registerPage';
import { withRouter } from 'react-router-dom';
import { register,showSignUpSucceed,initRegisterState } from '../actions/user';

const mapStateToProps = (state) => ({
  info: state.registerReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => {
      dispatch(register(data))
    },
    showSignUpSucceed: (data) => {
      dispatch(showSignUpSucceed(data))
    },
    initRegisterState: () =>{
    	dispatch(initRegisterState())
    },
  }
}


const RegisterContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register));

export default RegisterContainer;