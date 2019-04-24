import { connect } from 'react-redux';
import SignUp from './sign-up.component';
import { signUp, setPasswordMeterScore } from './actions';

const mapStateToProps = state => ({
  score: state.signUpReducer.score,
});

const mapDispatchToProps = {
  signUp,
  setPasswordMeterScore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
