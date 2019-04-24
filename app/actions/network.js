import * as Types from '../constants/network';
import { Network } from '../api';
import * as AccountActions from '../views/create-account/actions';
import { DOT_NETWORK_LIST } from '../../lib/constants/networks';
import { updateAppLoading } from '../containers/actions';
import { getTransactions } from '../views/dashboard/actions';
import { createFullNetworkURL } from '../utils/helper';

export const updateNetworkList = () => {
  const networks = DOT_NETWORK_LIST;
  return {
    type: Types.UPDATE_NETWORK_LIST,
    networks,
  };
};

export const changeNetwork = network => ({
  type: Types.CHANGE_NETWORK,
  network,
});

export const updateCustomNetwork = customNetwork => ({
  type: Types.UPDATE_CUSTOM_NETWORK,
  customNetwork,
});

export const setNetwork = async dispatch => {
  dispatch(updateNetworkList());
  const { result: network } = await Network.getCurrentNetwork();
  dispatch(changeNetwork(network));
};

export const propagateUpdates = async dispatch => {
  dispatch(updateAppLoading(true));
  dispatch(AccountActions.fetchAndSetBalances);
  dispatch(getTransactions);
  dispatch(updateAppLoading(false));
};

export const switchNetwork = network => async dispatch => {
  await Network.updateCurrentNetwork(network);
  dispatch(changeNetwork(network));
  dispatch(propagateUpdates);
};

export const setCustomNetwork = url => async (dispatch, getState) => {
  const { networks } = getState().networkReducer;
  let networkFullUrl = createFullNetworkURL(url);
  const urlObj = new URL(networkFullUrl);
  let { port } = urlObj;
  if (port === '') {
    port = '9944';
    networkFullUrl = `${networkFullUrl}:${port}`;
  }
  const customNetworkURLIndex = networks.findIndex(n => n.value === 'custom');
  const customNetworkObj = {
    ...networks[customNetworkURLIndex],
    networkFullUrl,
    networkPort: port,
    networkURL: urlObj.origin,
    url,
  };
  dispatch(updateCustomNetwork(customNetworkObj));
  await Network.updateCurrentNetwork(customNetworkObj);
  dispatch(changeNetwork(customNetworkObj));
  dispatch(propagateUpdates);
};
