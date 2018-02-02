import { connect } from 'react-redux';
import UserImage from '../components/userProfile/userImage';
import { withRouter } from 'react-router-dom';
import { upload_user_image } from '../actions/userProfile';
import { fetchUserInfo } from '../actions/fetchUserInfo'

const mapStateToProps = (state) => (
{
  userinfo: state.fetchUserInfoReducer,

  new_img: state.userImageReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
  	upload_user_image: (data) =>{
  		dispatch(upload_user_image(data))
  	},
  	fetchUserInfo:() =>{
      dispatch(fetchUserInfo())
    }
  }
}


const UserImageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserImage));

export default UserImageContainer;