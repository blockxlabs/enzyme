import { connect } from 'react-redux';
import Transfer from './transfer.component';
import { changePage, updateAppLoading } from '../../containers/actions';
import {
  clearTransferDetails,
  confirmTransaction,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
} from './actions';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  confirmDetails: state.transferReducer.confirmDetails,
  balance: state.accountReducer.balance,
  units: state.transferReducer.units,
  success: state.transferReducer.success,
  error: state.transferReducer.error,
  isToAddressError: state.transferReducer.isToAddressError,
  toAddressErrorMessage: state.transferReducer.toAddressErrorMessage,
  isAmountError: state.transferReducer.isAmountError,
  toAmountErrorMessage: state.transferReducer.toAmountErrorMessage,
});

const mapDispatchToProps = {
  changePage,
  clearTransferDetails,
  confirmTransaction,
  updateAppLoading,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfer);
