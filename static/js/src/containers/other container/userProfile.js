import { connect } from 'react-redux';
import UserProfile from '../components/userProfile';
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
})

const UserProfileContainer = connect(
  mapStateToProps,
)(UserProfile)

export default UserProfileContainer;