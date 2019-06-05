import { connect } from 'react-redux';
import SignIn from './sign-in.component';
import { unlockEnzyme } from './actions';
import { onBoard } from '../../actions/initialize';

const mapStateToProps = state => ({
  error: state.unlockEnzymeReducer.error,
  success: state.unlockEnzymeReducer.success,
});

const mapDispatchToProps = {
  unlockEnzyme,
  onBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
