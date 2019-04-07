import { connect } from 'react-redux';
import SignUp from './sign-up.component';
import { signUp } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
