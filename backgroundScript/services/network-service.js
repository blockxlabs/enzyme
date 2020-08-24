import { getStore } from '../store/store-provider';
import * as networkStateActions from '../actions/networks';
import { CUSTOM, DEV_DOT_NETWORK_LIST } from '../../lib/constants/networks';
import * as NetworkValidator from '../../lib/services/network-validator';
import * as Api from '../apis/api';
import * as ChainApi from '../apis/chain';

import { BAD_REQUEST } from '../../lib/constants/api';

const validateNetwork = network => {
  if (network === undefined || network === null || network === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires network.',
    };
  }
};

export const updateCurrentNetwork = async network => {
  const vResult = validateNetwork(network);
  if (vResult) return vResult;
  let newNetwork = network;
  if (network.value === CUSTOM) {
    const { networkFullUrl } = NetworkValidator.createFullNetworkURL(network.networkFullUrl);
    newNetwork = { networkFullUrl, ...network };
  }
  await Api.connectToApi(newNetwork);
  getStore().dispatch(networkStateActions.updateCurrentNetwork(newNetwork));
  return newNetwork;
};

export const getCurrentNetwork = () => {
  const { currentNetwork } = getStore().getState().networkState;
  return currentNetwork;
};

export const isConnected = () => {
  const isConnected = Api.isConnected();
  return { isConnected };
};

export const getNetworkByName = name => {
  const network = DEV_DOT_NETWORK_LIST.find(x => x.value === name);
  return network;
};
export const getUnits = () => ChainApi.getUnits();

export const getDeveloperMode = () => {
  const { isDeveloperMode } = getStore().getState().networkState;
  return isDeveloperMode;
};

export const updateDeveloperMode = isDeveloperMode => {
  getStore().dispatch(networkStateActions.updateDeveloperMode(isDeveloperMode));
};
