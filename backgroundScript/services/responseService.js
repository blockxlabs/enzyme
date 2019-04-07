import { getStore } from '../store/storeProvider';
import * as status from '../../lib/constants/api';
import * as appStateActions from '../actions/appState';
import * as accountService from './accountService';
import * as balanceService from './balanceService';
import * as TransactionService from './transactionService';

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
    sendResponse({ ...failure, message: 'Error while checking if app is ready' });
  }
};

export const setHashKey = async (request, sendResponse) => {
  try {
    const hashKey = request.data;
    const dispatcherObj = appStateActions.appStateSetHashKey(hashKey);
    await getStore().dispatch(dispatcherObj);
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
    sendResponse({ ...failure, message: 'Error while creating new account' });
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
    if (accounts.ciphertext === undefined) {
      sendResponse({ status: status.BAD_REQUEST, message: 'No Account Exist.' });
    }
    try {
      const { hashKey } = getStore().getState().appState;
      const decrpytedAccounts = await accountService.decryptAccounts(accounts, hashKey);
      sendResponse({ ...success, result: decrpytedAccounts });
    } catch (err) {
      sendResponse({
        status: status.UNAUTHORIZED,
        message: 'The request requires user authentication.',
      });
    }
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting accounts' });
  }
};

// Transactions

export const convertUnit = (request, sendResponse) => {
  try {
    const { value, currentUnit, convertInto } = request;
    const newValue = TransactionService.convertUnit(value, currentUnit, convertInto);
    sendResponse({ ...success, result: newValue });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in converting' });
  }
};

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
    const transactionStatus = await TransactionService.submitTransaction(transaction);
    sendResponse({ ...success, result: transactionStatus });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in submitting  Transaction ' });
  }
};
