import { connect } from 'react-redux';
import userProfileCenter from '../components/userProfile/userProfileCenter';
import { withRouter } from 'react-router-dom';
import { fetchUserInfo } from '../actions/fetchUserInfo'


const mapStateToProps = (state) => (
{
  userinfo: state.fetchUserInfoReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
  	// upload_user_image: (data) =>{
  	// 	dispatch(upload_user_image(data))
  	// },
  	// fetchUserInfo:() =>{
   //    dispatch(fetchUserInfo())
   //  },
  }
}


const userProfileCenterContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(userProfileCenter));

export default userProfileCenterContainer;