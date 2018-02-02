import { connect } from 'react-redux';
import ForgotPass from '../components/user/forgotPassword';
import { withRouter } from 'react-router-dom';
import { sendmailcode,resetpasswordbymail,initSendMailState } from '../actions/user';

const mapStateToProps = (state) => ({
  info: state.forgotPasswordReducer,
  sendemail: state.sendUserEmailReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
  	resetpasswordbymail: (data) =>{
  		dispatch(resetpasswordbymail(data))
  	},
  	sendmailcode: (data) =>{
  		dispatch(sendmailcode(data))
  	},
    initSendMailState:() =>{
      dispatch(initSendMailState())
    },
  }
}
const forgotPasswordContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPass));

export default forgotPasswordContainer;