import { combineReducers } from 'redux';
import appState from './app-state';
import accountState from './accounts';
import networkState from './networks';
import balanceState from './balances';
import transactionState from './transactions';
import dAppDataState from './dapp-data';
import permissionState from './permissions';
import addressBookState from './address-book';

export default combineReducers({
  appState,
  accountState,
  networkState,
  balanceState,
  transactionState,
  dAppDataState,
  permissionState,
  addressBookState,
});
