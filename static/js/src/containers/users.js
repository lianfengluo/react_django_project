import { connect } from 'react-redux';
import LoginPage from '../components/loginpage';
import { fetchUser } from '../actions/fetchuser';
import { withRouter } from 'react-router-dom';
// import { fetchUser } from '../actions/fetchuser';

const mapStateToProps = (state) => ({
  data: state.login,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

const UsersContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage));

export default UsersContainer;