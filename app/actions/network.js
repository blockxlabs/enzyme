import * as NetworkActionTypes from '../constants/network';
import { Network } from '../api';
import * as AccountActions from './account';
import {
  DOT_NETWORK_LIST,
  DEV_DOT_NETWORK_LIST,
  DEFAULT_NETWORK,
} from '../../lib/constants/networks';
import { updateAppLoading } from '../containers/actions';
import { getTransactions } from '../views/dashboard/actions';
import { createFullNetworkURL } from '../../lib/services/network-validator';
import AppConfig from '../../lib/constants/config';

export const updateNetworkList = networks => ({
  type: NetworkActionTypes.UPDATE_NETWORK_LIST,
  networks,
});

export const changeNetwork = network => ({
  type: NetworkActionTypes.CHANGE_NETWORK,
  network,
});

export const updateCustomNetwork = customNetwork => ({
  type: NetworkActionTypes.UPDATE_CUSTOM_NETWORK,
  customNetwork,
});

export const updateNetworkStatus = isConnected => ({
  type: NetworkActionTypes.UPDATE_NETWORK_STATUS,
  isConnected,
});

export const customNetworkValidationError = customNetworkError => ({
  type: NetworkActionTypes.CUSTOM_NETWORK_VALIDATION_ERROR,
  customNetworkError,
});

export const customNetworkValidationSuccess = customNetworkSuccess => ({
  type: NetworkActionTypes.CUSTOM_NETWORK_VALIDATION_SUCCESS,
  customNetworkSuccess,
});

export const updateDeveloperMode = isDeveloperMode => ({
  type: NetworkActionTypes.UPDATE_DEVELOPER_MODE,
  isDeveloperMode,
});

const fetchUnits = units => ({
  type: NetworkActionTypes.FETCH_UNITS,
  units,
});

const fetchUnit = unit => ({
  type: NetworkActionTypes.FETCH_UNIT,
  unit,
});
export const getUnits = () => async dispatch => {
  const { result } = await Network.getUnits();
  const unit = result.find(x => x.value === '-');
  dispatch(fetchUnit(unit));
  dispatch(fetchUnits(result));
};
export const setNetwork = async (dispatch, getState) => {
  const { isDeveloperMode } = getState().networkReducer;
  if (isDeveloperMode) {
    dispatch(updateNetworkList([...DEV_DOT_NETWORK_LIST, { text: 'Custom...', value: 'custom' }]));
  } else {
    dispatch(updateNetworkList([...DOT_NETWORK_LIST]));
  }

  const { result: network } = await Network.getCurrentNetwork();
  if (network.value === 'custom') {
    dispatch(updateCustomNetwork(network));
  }
  dispatch(changeNetwork(network));
};

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
export const propagateUpdates = async dispatch => {
  dispatch(updateAppLoading(true));
  dispatch(updateNetworkStatus(false));
  dispatch(AccountActions.fetchAndSetAccounts);
  dispatch(AccountActions.setInitialBalance);
  dispatch(getTransactions);
  dispatch(getUnits());
  dispatch(updateAppLoading(false));
};

export const switchNetwork = network => async dispatch => {
  await Network.updateCurrentNetwork(network);
  dispatch(changeNetwork(network));
  dispatch(propagateUpdates);
};

export const validateAndSaveURL = url => async (dispatch, getState) => {
  try {
    dispatch(updateAppLoading(true));
    const { networks } = getState().networkReducer;
    const customNetworkURLIndex = networks.findIndex(n => n.value === 'custom');
    const customNetworkObj = {
      ...networks[customNetworkURLIndex],
      ...createFullNetworkURL(url),
      url,
    };
    const { result: networkObj } = await Network.updateCurrentNetwork(customNetworkObj);
    dispatch(customNetworkValidationError(null));
    dispatch(customNetworkValidationSuccess(true));
    dispatch(changeNetwork(networkObj));
    dispatch(updateCustomNetwork(networkObj));
    dispatch(updateAppLoading(true));
    await delay(AppConfig.scheduleNetworkCheck);
    dispatch(propagateUpdates);
  } catch (e) {
    dispatch(
      customNetworkValidationError({
        customNetworkIsValid: false,
        customNetworkErrorMessage: 'Invalid URL',
      }),
    );
    dispatch(updateAppLoading(false));
  }
};

export const onToggleDeveloperMode = isDeveloperMode => async dispatch => {
  if (!isDeveloperMode) {
    // When user turn off developer mode then set to default network.
    const emptyCustomNetwork = {};
    dispatch(switchNetwork(DEFAULT_NETWORK));
    dispatch(updateCustomNetwork(emptyCustomNetwork));
  }
  await Network.updateDeveloperMode(isDeveloperMode);
  dispatch(updateDeveloperMode(isDeveloperMode));
  await dispatch(setNetwork);
};

export const getDeveloperMode = () => async dispatch => {
  const { result } = await Network.getDeveloperMode();
  dispatch(updateDeveloperMode(result));
};
