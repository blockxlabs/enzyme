import * as TransferActionTypes from './action-types';
import { Transaction } from '../../api';
import { TRANSFER_COINS } from '../../../lib/constants/transaction';
import { updateAppLoading } from '../../containers/actions';

export const dispatchSetTransferDetails = confirmDetails => ({
  type: TransferActionTypes.COIN_TRANSFER_DETAILS,
  confirmDetails,
});

export const clearTransferDetails = () => ({
  type: TransferActionTypes.CLEAR_COIN_TRANSFER_DETAILS,
});

const confirmTransactionSuccess = success => ({
  type: TransferActionTypes.CONFIRM_TRANSFER_SUCCESS,
  success,
});

const confirmTransactionError = error => ({
  type: TransferActionTypes.CONFIRM_TRANSFER_ERROR,
  error,
});

const setTransferValidationError = error => ({
  type: TransferActionTypes.SET_TRANSFER_VALIDATION_ERROR,
  error,
});

export const confirmTransaction = (to, account, amount, unit) => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    const { result: transaction } = await Transaction.confirmTransaction({
      txnType: TRANSFER_COINS,
      to,
      account,
      amount,
      unit,
    });
    if (transaction.isError) {
      dispatch(updateAppLoading(false));
      dispatch(setTransferValidationError(transaction));
      dispatch(confirmTransactionError(transaction));
    } else {
      dispatch(setTransferValidationError(null));
      dispatch(confirmTransactionError(null));
      dispatch(dispatchSetTransferDetails(transaction));
      dispatch(confirmTransactionSuccess(true));
    }
  } catch (e) {
    dispatch(updateAppLoading(false));
    dispatch(confirmTransactionError(e));
  }
};

export const resetConfirmOnBoarding = () => async dispatch => {
  dispatch(confirmTransactionSuccess(false));
  dispatch(setTransferValidationError(null));
  dispatch(confirmTransactionError(null));
};
