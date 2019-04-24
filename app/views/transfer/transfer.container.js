import { connect } from 'react-redux';
import Transfer from './transfer.component';
import { changePage } from '../../containers/actions';
import {
  setTransferDetails,
  clearTransferDetails,
  setTransferFee,
  setTransferAmount,
} from './actions';

const mapStateToProps = state => ({
  account: state.createAccountReducer.account,
  transferDetails: state.transferReducer.transferDetails,
  balance: state.createAccountReducer.balance,
  transferFee: state.transferReducer.transferFee,
  transferAmount: state.transferReducer.transferAmount,
});

const mapDispatchToProps = {
  changePage,
  setTransferDetails,
  clearTransferDetails,
  setTransferFee,
  setTransferAmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfer);
