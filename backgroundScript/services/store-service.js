import * as appActions from '../actions/app-state';
import { getStore } from '../store/store-provider';
import * as accountActions from '../actions/accounts';
import * as transactionActions from '../actions/transactions';
import * as networkStateActions from '../actions/networks';
import * as permissionStateActions from '../actions/permissions';
import { updateAddressBookList } from '../actions/address-book';

export const updateHashKeyState = async hashKey => getStore().dispatch(appActions.appStateSetHashKey(hashKey));

export const updateAppState = async () => getStore().dispatch(appActions.appStateReady());

export const updateAppOnBoarded = async () => getStore().dispatch(appActions.appStateOnBoarded());

export const updatesAccountsState = async accounts => getStore().dispatch(accountActions.updateAccountList(accounts));

export const updateCurrentAccountState = async account => getStore().dispatch(accountActions.changeCurrentAccount(account));

export const updateTransactionsState = async transactions => getStore().dispatch(transactionActions.fetchTransactions(transactions));

export const updateCurrentNetworkState = async network => getStore().dispatch(networkStateActions.updateCurrentNetwork(network));

export const updateDeveloperMode = async isDeveloperMode => getStore().dispatch(networkStateActions.updateDeveloperMode(isDeveloperMode));

export const updateWhiteListedDAppsState = async whiteListedDApps => getStore().dispatch(permissionStateActions.updateAuthorizedDAppList(whiteListedDApps));

export const updateAddressBook = addreesBook => getStore().dispatch(updateAddressBookList(addreesBook));
