import * as NetworkActionTypes from '../constants/network';
import { Network } from '../api';
import * as AccountActions from './account';
import { DOT_NETWORK_LIST } from '../../lib/constants/networks';
import { updateAppLoading } from '../containers/actions';
import { getTransactions } from '../views/dashboard/actions';
import { createFullNetworkURL } from '../../lib/services/network-validator';

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

export const setNetwork = async dispatch => {
  dispatch(updateNetworkList([...DOT_NETWORK_LIST, { text: 'Custom...', value: 'custom' }]));
  const { result: network } = await Network.getCurrentNetwork();
  if (network.value === 'custom') {
    dispatch(updateCustomNetwork(network));
  }
  dispatch(changeNetwork(network));
};

export const propagateUpdates = async dispatch => {
  dispatch(updateAppLoading(true));
  dispatch(updateNetworkStatus(false));
  dispatch(AccountActions.setInitialBalance);
  dispatch(getTransactions);
  dispatch(updateAppLoading(false));
};

export const switchNetwork = network => async dispatch => {
  await Network.updateCurrentNetwork(network);
  dispatch(changeNetwork(network));
  dispatch(propagateUpdates);
};

export const validateAndSaveURL = url => async (dispatch, getState) => {
  try {
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
    dispatch(propagateUpdates);
  } catch (e) {
    dispatch(
      customNetworkValidationError({
        customNetworkIsValid: false,
        customNetworkErrorMessage: 'Invalid URL',
      }),
    );
  }
};
