import { connect } from 'react-redux';
import UserEmail from '../components/userProfile/userEmail';
import { withRouter } from 'react-router-dom';
import { bindUserEmail } from '../actions/userProfile';
import { fetchUserInfo } from '../actions/fetchUserInfo'
import { sendmailcode,initSendMailState } from '../actions/user';

const mapStateToProps = (state) => (
{
  userinfo: state.fetchUserInfoReducer,
  sendemail: state.sendUserEmailReducer,
  bindemail: state.editUserEmailReducer
})
const mapDispatchToProps = (dispatch) => {
  return {
  	bindUserEmail: (data) =>{
  		dispatch(bindUserEmail(data))
  	},
  	fetchUserInfo:() =>{
      dispatch(fetchUserInfo())
    },
    sendmailcode: (data) =>{
      dispatch(sendmailcode(data))
    },
    initSendMailState:() =>{
      dispatch(initSendMailState())
    },
  }
}


const UserEmailContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEmail));

export default UserEmailContainer;