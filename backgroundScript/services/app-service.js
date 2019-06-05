// persistence reducer from localstorage
import * as appActions from '../actions/app-state';
import { getStore } from '../store/store-provider';
import * as accountActions from '../actions/accounts';
import * as transactionActions from '../actions/transactions';
import * as networkStateActions from '../actions/networks';
import * as AccountListener from '../listeners/account-listener';
import * as NetworkListener from '../listeners/network-listener';
import * as TransactionListener from '../listeners/transaction-listener';
import * as MigrationService from './migration-service';
import * as StorageService from '../../lib/services/extension/storage';
import { APP } from '../../lib/constants/storage-keys';
import * as API from '../apis/api';
import { ALEXANDER_NETWORK } from '../../lib/constants/networks';

const updateHashKeyState = async hashKey => getStore().dispatch(appActions.appStateSetHashKey(hashKey));

const updateAppState = async () => getStore().dispatch(appActions.appStateReady());

const updateAppOnBoarded = async () => getStore().dispatch(appActions.appStateOnBoarded());

export const updatesAccountsState = async accounts => getStore().dispatch(accountActions.updateAccountList(accounts));

export const updateCurrentAccountState = async account => getStore().dispatch(accountActions.changeCurrentAccount(account));

export const updateTransactionsState = async transactions => getStore().dispatch(transactionActions.fetchTransactions(transactions));

export const updateCurrentNetworkState = async network => getStore().dispatch(networkStateActions.updateCurrentNetwork(network));

export const appReady = async hashKey => {
  // Start all Listener to watch on State and stored once update

  AccountListener.handleChange();
  NetworkListener.handleChange();
  TransactionListener.handleChange();

  // load from local Storage
  const data = await StorageService.getLocalStorage();
  const { accounts } = data;
  if (accounts !== undefined) {
    // Sign IN
    // Start Migration Script
    const latestData = await MigrationService.startMigration(data, hashKey);

    const {
      accounts: { accounts, currentAccount },
      transactions: { transactionArr },
      network: { currentNetwork },
    } = latestData;
    await Promise.all([
      updateHashKeyState(hashKey),
      updateCurrentAccountState(currentAccount),
      updatesAccountsState(accounts),
      updateTransactionsState(transactionArr),
      updateCurrentNetworkState(currentNetwork),
      updateAppState(),
    ]);

    // define Polkadot Api
    API.defineApi(currentNetwork.networkFullUrl);
  } else {
    // Sign UP
    await Promise.all([updateHashKeyState(hashKey), updateAppState()]);
    API.defineApi(ALEXANDER_NETWORK.networkFullUrl);
  }
  return hashKey;
};

export const setAppIsOnBoarded = async () => {
  const appState = { isAppOnBoarded: true };
  const onBoarded = await StorageService.setLocalStorage(APP, appState);
  await updateAppOnBoarded(true);
  return onBoarded;
};

export const getAppIsOnBoarded = async () => {
  const appState = await StorageService.getLocalStorage(APP);
  const { isAppOnBoarded } = appState;
  await updateAppOnBoarded(isAppOnBoarded);
  return appState;
};
