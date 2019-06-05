/* eslint-disable no-unused-vars */
import moment from 'moment';
import BN from 'bn.js';
import * as Transaction from '../../lib/constants/transaction';
import * as FeeService from './fee-service';
import { getStore } from '../store/store-provider';
import * as transactionActions from '../actions/transactions';
import { updateTransactionsState } from './app-service';
import * as Notification from '../../lib/services/extension/notifications';
import { createTransactionToastMessage } from '../../lib/services/static-message-factory-service';
import { TRANSACTION_DETAIL_URL } from '../../lib/constants/api';
import * as Wallet from '../apis/dot-wallet';
import { convertUnit } from '../../lib/services/unit-converter';
import { baseUnit } from '../../lib/constants/units';

const extension = require('extensionizer');

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

const handelTransactionError = txnError => ({ isError: true, ...txnError });

const isValidTxnAmount = (balance, totalAmount) => balance.gt(new BN(Transaction.MINIMUM_BALANCE)) && balance.gt(totalAmount);

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
  let newTransactions = [];
  if (network !== undefined) {
    newTransactions = transactions.filter(tx => tx.internal.network.value === network.value);
  }
  if (address !== undefined) {
    newTransactions = newTransactions.filter(tx => tx.internal.address === address);
  }
  return newTransactions;
};

export const getTransactionFees = async (txnType, senderAddress, toAddress) => {
  switch (txnType) {
    case Transaction.TRANSFER_COINS: {
      const fees = await FeeService.getTransferFees(senderAddress, toAddress);
      return fees;
    }
    default:
      throw new Error('Wrong Transaction Type');
  }
};

export const sendOSNotification = async transaction => {
  const { message } = createTransactionToastMessage(transaction);
  // TODO:KP Update once we have blockchain explore
  // const txnDetailURl = `${TRANSACTION_DETAIL_URL}/${transaction.txnHash}`;
  const txnDetailURl = TRANSACTION_DETAIL_URL;
  await Notification.createNotification('ENZYME', message, txnDetailURl);
};

export const updateTransactionState = async (transaction, txnHash, txnStatus) => {
  const newTransaction = updateTransactionObj(transaction, txnHash, txnStatus);
  const newTransactionArr = await mergeTransactions(newTransaction);
  if (txnStatus === Transaction.PENDING) {
    await updateTransaction(newTransaction);
  } else {
    await updateTransaction(undefined);
    const views = extension.extension.getViews({ type: 'popup' });
    if (views.length === 0) {
      await sendOSNotification(newTransaction);
    }
  }
  await updateTransactionsState(newTransactionArr);
};

const createTransactionObj = transaction => {
  const {
    to, account, amount, unit, fAmount, fees, totalAmount, network
  } = transaction;
  const newTransactionObject = {
    txnType: Transaction.TRANSFER_COINS,
    metadata: {
      account,
      to,
      amount,
      unit,
      fAmount,
      fees,
      transferFee: Wallet.valueFormatter(fees.totalFee),
      transferAmount: Wallet.valueFormatter(fAmount),
      totalTransferAmount: Wallet.valueFormatter(totalAmount),
    },
    internal: { address: account.address, network },
  };
  return newTransactionObject;
};

export const confirmTransaction = async (senderAddress, network, transaction) => {
  //TODO KP: Match Transaction Object
  const {
    to, account, amount, unit, txnType
  } = transaction;
  const isValidAddress = Wallet.isValidAddress(to);
  let newTransaction;
  let txnError = {
    isToAddressError: false,
    toAddressErrorMessage: null,
    isAmountError: false,
    toAmountErrorMessage: null,
  };
  if (isValidAddress) {
    const fees = await getTransactionFees(txnType, senderAddress, to); // in femto
    const balance = await Wallet.getBalance(senderAddress); // in femto
    const fAmount = convertUnit(amount.toString(), unit.text, baseUnit.text); // converting in femto
    const totalAmount = new BN(fAmount).add(new BN(fees.totalFee));
    const balanceInBN = new BN(balance.balance);
    const isValidAmount = isValidTxnAmount(balanceInBN, totalAmount);
    if (isValidAmount) {
      newTransaction = {
        to,
        account,
        unit,
        amount,
        fAmount,
        fees,
        totalAmount,
        network,
      };
      newTransaction = createTransactionObj(newTransaction);
    } else {
      txnError = {
        ...txnError,
        ...{ isAmountError: true, toAmountErrorMessage: 'Insufficient Balance' },
      };
      newTransaction = handelTransactionError(txnError);
    }
  } else {
    txnError = {
      ...txnError,
      ...{ isToAddressError: true, toAddressErrorMessage: 'Invalid Address' },
    };
    newTransaction = handelTransactionError(txnError);
  }
  return newTransaction;
};
