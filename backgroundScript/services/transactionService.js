/* eslint-disable no-unused-vars */
import moment from 'moment';
import * as TransactionTypes from '../../lib/constants/transaction';
import * as FeeService from './feeService';
import { getStore } from '../store/storeProvider';
import * as StorageServices from '../../lib/services/extension/storage';
import { TRANSACTIONS } from '../../lib/constants/storageKeys';
import * as transactionActions from '../actions/transactions';
import { updateTransactionsState } from './appService';

const storingTransactions = async () => {
  // storing Transactions reducer state to local storage.
  const { appState, transactionState } = getStore().getState();
  const encryptedTransactionState = StorageServices.encrypt(transactionState, appState.hashKey);
  const result = await StorageServices.setLocalStorage(TRANSACTIONS, encryptedTransactionState);
  return result;
};

//  update transaction State
const updateTransaction = async transaction => {
  getStore().dispatch(transactionActions.fetchTransaction(transaction));
};

const updateTransactionObj = (transaction, txnHash, txnStatus) => ({
  ...transaction,
  status: txnStatus,
  date: moment().format(),
  txnHash,
});

export const mergeTransactions = async newTransaction => {
  const { transactionArr } = getStore().getState().transactionState;
  // remove Pending duplicate TXN and overide with new Status
  const pendingTransactionIndex = transactionArr.findIndex(
    x => x.txnHash === newTransaction.txnHash,
  );
  if (pendingTransactionIndex > -1) {
    transactionArr.splice(pendingTransactionIndex, 1, newTransaction);
  } else {
    transactionArr.push(newTransaction);
  }
  return transactionArr;
};

// filter transactions
export const filterTransactions = async (transactions, network, address) => {
  if (network !== undefined) {
    transactions = transactions.filter(tx => tx.internal.network.value === network.value);
  }
  if (address !== undefined) {
    transactions = transactions.filter(tx => tx.internal.address === address);
  }
  return transactions;
};

export const getTransactionFees = async (txnType, toAddress) => {
  switch (txnType) {
    case TransactionTypes.TRANSFER_COINS: {
      const fees = await FeeService.getTransferFees(toAddress);
      return fees;
    }
    default:
      throw new Error('Wrong Transaction Type');
  }
};

export const updateTransactionState = async (transaction, txnHash, txnStatus) => {
  const newTransaction = updateTransactionObj(transaction, txnHash, txnStatus);
  const newTransactionArr = await mergeTransactions(newTransaction);
  if (txnStatus === TransactionTypes.PENDING) {
    await updateTransaction(newTransaction);
  } else {
    await updateTransaction(undefined);
  }
  await updateTransactionsState(newTransactionArr);
  await storingTransactions();
};
