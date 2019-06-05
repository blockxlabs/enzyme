import { getStore } from '../store/store-provider';
import * as status from '../../lib/constants/api';
import * as AccountService from './account-service';
import * as BalanceService from './balance-service';
import * as TransactionService from './transaction-service';
import * as TransactionWatcherService from './transaction-watcher-service';
import * as NetworkService from './network-service';
import * as AppService from './app-service';
// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
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

export const updateAccountAlias = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { address, alias } = request;
    await AccountService.updateAccountAlias(address, alias);
    await sendResponse({ ...success, result: name });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in new account name.' });
  }
};
export const createAccount = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const {
      seedWords, keypairType, isOnBoarding, alias
    } = request;
    const address = await AccountService.createAccount(seedWords, keypairType, isOnBoarding, alias);
    await sendResponse({ ...success, result: address });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while creating new account.' });
  }
};

export const getBalances = async (request, sendResponse) => {
  try {
    const { addresses } = request;
    const accountBalanceArr = await BalanceService.getBalances(addresses);
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
    await NetworkService.updateCurrentNetwork(network);
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
    const { isAppOnBoarded } = await AppService.getAppIsOnBoarded();
    const { accounts } = await AccountService.getAccounts();

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
    if (isAppOnBoarded) {
      const result = AccountService.getAccountsWithoutSeedWords(accountState);
      sendResponse({ ...success, result });
    } else {
      sendResponse({ ...success, result: accountState });
    }
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

export const confirmTransaction = async (request, sendResponse) => {
  try {
    const { transaction } = request;
    const {
      accountState: {
        currentAccount: { address },
      },
      networkState: { currentNetwork },
    } = getStore().getState();
    const result = await TransactionService.confirmTransaction(
      address,
      currentNetwork,
      transaction,
    );
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in submitting  Transaction ' });
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

export const getIsAppOnBoarded = async (request, sendResponse) => {
  try {
    const result = await AppService.getAppIsOnBoarded();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  OnBoard' });
  }
};

export const setIsAppOnBoarded = async (request, sendResponse) => {
  try {
    const result = await AppService.setAppIsOnBoarded();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Finishing Onboarding.' });
  }
};

export const isConnected = (request, sendResponse) => {
  try {
    const result = NetworkService.isConnected();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Node connectivity.' });
  }
};

export const isValidAddress = async (request, sendResponse) => {
  try {
    const { address } = request;
    const isAddress = AccountService.isValidAddress(address);
    const result = { isAddress };
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Validation Address.' });
  }
};
