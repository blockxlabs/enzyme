import { connect } from 'react-redux';
import Confirm from './confirm.component';
import { changePage } from '../../containers/actions';
import { submitTransaction } from './actions';
import { resetConfirmOnBoarding } from '../transfer/actions';

const mapStateToProps = state => ({
  confirmDetails: state.transferReducer.confirmDetails,
});

const mapDispatchToProps = {
  changePage,
  submitTransaction,
  resetConfirmOnBoarding,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm);
