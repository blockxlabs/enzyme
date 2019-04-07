import { connect } from 'react-redux';
import App from './app.component';
import { verifyTermsVersion } from '../views/terms/actions';
import { changePage } from './actions';
import { onBoard } from '../actions/initialize';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  isLoading: state.appStateReducer.isLoading,
  isAgree: state.termsReducer.isAgree,
  success: state.signUpReducer.success,
  isOnBoarded: state.appStateReducer.isOnBoarded,
});

const mapDispatchToProps = {
  changePage,
  verifyTermsVersion,
  onBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
