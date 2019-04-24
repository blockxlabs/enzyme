import { getStore } from '../store/storeProvider';
import * as status from '../../lib/constants/api';
import * as accountService from './accountService';
import * as balanceService from './balanceService';
import * as TransactionService from './transactionService';
import * as TransactionWatcherService from './transactionWatcherService';
import * as NetworkService from './networkService';
import * as AppService from './appService';

// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.failure,
  message: 'failed',
};

export const handleDefault = async (request, sendResponse) => {
  const response = {
    ...failure,
    message: 'Invalid request.Check message type',
  };
  sendResponse(response);
};

//TODO: KP: Take this fn out. Just in case something is really wrong. Otherwise
export const handleProcessingError = async (request, sendResponse) => {
  const response = {
    ...failure,
    message: 'Error while processing request.Check message type',
  };
  sendResponse(response);
};

export const isAppReady = async (request, sendResponse) => {
  try {
    const { isAppReady } = getStore().getState().appState;
    sendResponse({ ...success, result: isAppReady });
  } catch (err) {
    sendResponse({
      ...failure,
      message: 'Error while checking if app is ready',
    });
  }
};

export const setHashKey = async (request, sendResponse) => {
  try {
    const { data } = request;
    const hashKey = await AppService.appReady(data);
    if (hashKey !== undefined);
    sendResponse({ ...success, message: 'Password created' });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error setting password' });
  }
};

export const createAccount = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { seedWords, isOnBoarding } = request;
    const address = await accountService.createAccount(seedWords, isOnBoarding);
    await sendResponse({ ...success, result: address });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while creating new account.' });
  }
};

export const getBalances = async (request, sendResponse) => {
  try {
    const { addresses } = request;
    const accountBalanceArr = await balanceService.getBalances(addresses);
    sendResponse({ ...success, result: accountBalanceArr });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting latest balance' });
  }
};

export const getCurrentAccount = async (request, sendResponse) => {
  try {
    const { currentAccount } = getStore().getState().accountState;
    sendResponse({ ...success, result: currentAccount });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting current account' });
  }
};

export const getCurrentNetwork = async (request, sendResponse) => {
  try {
    const { currentNetwork } = getStore().getState().networkState;
    sendResponse({ ...success, result: currentNetwork });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting current network' });
  }
};

export const updateCurrentNetwork = async (request, sendResponse) => {
  try {
    const { network } = request;
    const {
      appState: { hashKey },
    } = getStore().getState();
    await NetworkService.updateCurrentNetwork(network, hashKey);
    const { currentNetwork } = getStore().getState().networkState;
    sendResponse({ ...success, result: currentNetwork });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in current network setup' });
  }
};

export const getSeedWords = async (request, sendResponse) => {
  try {
    const { seedWords } = getStore().getState().accountState;
    sendResponse({ ...success, result: seedWords });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting new seedWords' });
  }
};

export const getAccounts = async (request, sendResponse) => {
  try {
    const { accounts } = await accountService.getAccounts();
    if (accounts === undefined) {
      sendResponse({
        status: status.BAD_REQUEST,
        message: 'No Account Exist.',
      });
    }
    const {
      appState: { hashKey },
      accountState,
    } = getStore().getState();
    if (hashKey === undefined) {
      sendResponse({
        status: status.UNAUTHORIZED,
        message: 'The request requires user authentication.',
      });
    }
    sendResponse({ ...success, result: accountState });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting accounts' });
  }
};

// Transactions

export const getTransactionFees = async (request, sendResponse) => {
  try {
    const { txnType, toAddress } = request;
    const fees = await TransactionService.getTransactionFees(txnType, toAddress);
    sendResponse({ ...success, result: fees });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  Transaction fees' });
  }
};

export const submitTransaction = async (request, sendResponse) => {
  try {
    const { transaction } = request;
    const transactionStatus = await TransactionWatcherService.submitTransaction(transaction);
    sendResponse({ ...success, result: transactionStatus });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in submitting  Transaction ' });
  }
};

export const getTransactions = async (request, sendResponse) => {
  const { network, address } = request;
  try {
    const {
      transactionState: { transactionArr },
    } = getStore().getState();
    const transactionList = await TransactionService.filterTransactions(
      transactionArr,
      network,
      address,
    );
    sendResponse({ ...success, result: transactionList });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  Transactions' });
  }
};

export const getTransaction = async (request, sendResponse) => {
  const { network, address, txnHash } = request;
  try {
    const {
      transactionState: { transactionArr },
    } = getStore().getState();
    const transactionList = await TransactionService.filterTransactions(
      transactionArr,
      network,
      address,
    );
    const transaction = transactionList.find(tx => tx.txnHash === txnHash);
    sendResponse({ ...success, result: transaction });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  Transaction' });
  }
};
