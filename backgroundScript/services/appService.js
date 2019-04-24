// persistence reducer from localstorage
import * as appActions from '../actions/appState';
import { getStore } from '../store/storeProvider';
import * as StorageServices from '../../lib/services/extension/storage';
import * as StorageKeys from '../../lib/constants/storageKeys';
import * as accountActions from '../actions/accounts';
import * as transactionActions from '../actions/transactions';
import * as networkStateActions from '../actions/networks';
import { DOT_NETWORK_LIST } from '../../lib/constants/networks';

const updateHashKeyState = async hashKey => getStore().dispatch(appActions.appStateSetHashKey(hashKey));

const updateAppState = async () => getStore().dispatch(appActions.appStateReady());

export const updatesAccountsState = async accounts => getStore().dispatch(accountActions.updateAccountList(accounts));

export const updateCurrentAccountState = async account => getStore().dispatch(accountActions.changeCurrentAccount(account));

export const updateTransactionsState = async transactions => getStore().dispatch(transactionActions.fetchTransactions(transactions));

export const updateCurrentNetworkState = async network => getStore().dispatch(networkStateActions.updateCurrentNetwork(network));

const getAccountState = async hashKey => {
  const { accounts } = await StorageServices.getLocalStorage(StorageKeys.ACCOUNTS);
  if (accounts !== undefined) {
    return StorageServices.decrypt({ ...accounts }, hashKey);
  }
  return { accounts: [], currentAccount: undefined };
};

const getTransactions = async hashKey => {
  const { transactions } = await StorageServices.getLocalStorage(StorageKeys.TRANSACTIONS);
  if (transactions !== undefined) {
    return StorageServices.decrypt({ ...transactions }, hashKey);
  }
  return { transactionArr: [] };
};

const getNetwork = async hashKey => {
  const { network } = await StorageServices.getLocalStorage(StorageKeys.NETWORK);
  if (network !== undefined) {
    return StorageServices.decrypt({ ...network }, hashKey);
  }
  // default network
  return DOT_NETWORK_LIST[0];
};

export const appReady = async hashKey => {
  const { accounts, currentAccount } = await getAccountState(hashKey);
  const { transactionArr } = await getTransactions(hashKey);
  const network = await getNetwork(hashKey);
  await Promise.all([
    updateHashKeyState(hashKey),
    updateCurrentAccountState(currentAccount),
    updatesAccountsState(accounts),
    updateTransactionsState(transactionArr),
    updateCurrentNetworkState(network),
    updateAppState(),
  ]);
  return hashKey;
};
