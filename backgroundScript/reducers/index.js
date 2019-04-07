import { combineReducers } from 'redux';
import appState from './appState';
import accountState from './accounts';
import networkState from './networks';
import balanceState from './balances';

export default combineReducers({
  appState,
  accountState,
  networkState,
  balanceState,
});
