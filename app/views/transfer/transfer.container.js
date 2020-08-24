import { connect } from 'react-redux';
import Transfer from './transfer.component';
import { changePage, updateAppLoading, updateBackupPage } from '../../containers/actions';
import { updateToAddress } from '../../actions/address-book';
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
  unit: state.networkReducer.unit,
  units: state.networkReducer.units,
  success: state.transferReducer.success,
  error: state.transferReducer.error,
  isToAddressError: state.transferReducer.isToAddressError,
  toAddressErrorMessage: state.transferReducer.toAddressErrorMessage,
  isAmountError: state.transferReducer.isAmountError,
  toAmountErrorMessage: state.transferReducer.toAmountErrorMessage,
  page: state.appStateReducer.page,
  toAddress: state.addressBookReducer.toAddress,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  clearTransferDetails,
  confirmTransaction,
  updateAppLoading,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
  updateToAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
