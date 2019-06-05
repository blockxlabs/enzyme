import { connect } from 'react-redux';
import Terms from './terms.component';
import { storeTermsStatus } from './actions';
import { onBoard } from '../../actions/initialize';
import { updateAppLoading } from '../../containers/actions';

const mapStateToProps = state => ({
  isAgree: state.termsReducer.isAgree,
});

const mapDispatchToProps = {
  storeTermsStatus,
  onBoard,
  updateAppLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Terms);
