import * as DashboardActionTypes from './action-types';
import { Transaction } from '../../api';
import { PENDING } from '../../../lib/constants/transaction';
import {
  getTransfersWithMoment,
  getTransactionsToDisplay,
} from '../../../lib/services/static-message-factory-service';

export const updateTransactions = transactions => ({
  type: DashboardActionTypes.UPDATE_TRANSACTION_LIST,
  transactions,
});

const updatePendingTransfers = pendingTransfers => ({
  type: DashboardActionTypes.UPDATE_PENDING_TRANSACTION_LIST,
  pendingTransfers,
});

export const getTransactions = async (dispatch, getState) => {
  const {
    account: { address },
  } = getState().accountReducer;
  const { network } = getState().networkReducer;
  const { result: transactions } = await Transaction.getTransactions(network, address);
  const modifiedTransactions = getTransactionsToDisplay(transactions);
  const transfersWithModifiedTime = getTransfersWithMoment(modifiedTransactions);

  const pendingTransfers = transactions.filter(transaction => transaction.status === PENDING);
  dispatch(updatePendingTransfers(pendingTransfers === undefined ? [] : pendingTransfers));
  dispatch(updateTransactions(transfersWithModifiedTime.reverse()));
};
