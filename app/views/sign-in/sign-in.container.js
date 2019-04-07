import { connect } from 'react-redux';
import SignIn from './sign-in.component';
import { unlockEnzyme } from './actions';

const mapStateToProps = state => ({
  success: state.unlockEnzymeReducer.success,
  error: state.unlockEnzymeReducer.error,
});

const mapDispatchToProps = {
  unlockEnzyme,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
