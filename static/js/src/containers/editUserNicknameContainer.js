import { connect } from 'react-redux';
import EditUserNickname from '../components/userProfile/userNickname';
import { withRouter } from 'react-router-dom';
import { fetchUserInfo } from '../actions/fetchUserInfo'
import { editUserNickname } from '../actions/userProfile';

const mapStateToProps = (state) => (
{
  userinfo: state.fetchUserInfoReducer,
  changenickname: state.editUserNicknameReducer,
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo:() =>{
      dispatch(fetchUserInfo())
    },
    editUserNickname: (data) =>{
      dispatch(editUserNickname(data))
    },
  }
}


const EditUserNicknameContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserNickname));

export default EditUserNicknameContainer;