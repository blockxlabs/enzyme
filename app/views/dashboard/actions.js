import * as Types from './actionTypes';
import { Transaction } from '../../api';
import { PENDING } from '../../../lib/constants/transaction';
import { updateAppLoading } from '../../containers/actions';
import {
  getTransfersWithMoment,
  getTransactionsToDisplay,
} from '../../services/static-message-factory-service';

export const updateTransactions = transactions => ({
  type: Types.UPDATE_TRANSACTION_LIST,
  transactions,
});

const updatePendingTransfers = pendingTransfers => ({
  type: Types.UPDATE_PENDING_TRANSACTION_LIST,
  pendingTransfers,
});

export const getTransactions = async (dispatch, getState) => {
  try {
    dispatch(updateAppLoading(true));
    const {
      account: { address },
    } = getState().createAccountReducer;
    const { network } = getState().networkReducer;
    const { result: transactions } = await Transaction.getTransactions(network, address);
    const modifiedTransactions = getTransactionsToDisplay(transactions);
    const transfersWithModifiedTime = getTransfersWithMoment(modifiedTransactions);

    const pendingTransfers = transactions.filter(transaction => transaction.status === PENDING);
    dispatch(updatePendingTransfers(pendingTransfers === undefined ? [] : pendingTransfers));
    dispatch(updateTransactions(transfersWithModifiedTime.reverse()));
  } finally {
    dispatch(updateAppLoading(false));
  }
};
