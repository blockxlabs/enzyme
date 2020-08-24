import { connect } from 'react-redux';
import Confirm from './confirm.component';
import { changePage } from '../../containers/actions';
import { submitTransaction, isNewAddress } from './actions';
import { resetConfirmOnBoarding } from '../transfer/actions';
import { createToast } from '../../constants/toast';
import { updateToAddress } from '../../actions/address-book';

const mapStateToProps = state => ({
  confirmDetails: state.transferReducer.confirmDetails,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  submitTransaction,
  isNewAddress,
  resetConfirmOnBoarding,
  updateToAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
