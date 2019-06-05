import { getStore } from '../store/store-provider';
import * as networkStateActions from '../actions/networks';
import { CUSTOM } from '../../lib/constants/networks';
import * as NetworkValidator from '../../lib/services/network-validator';
import * as Wallet from '../apis/dot-wallet';
import * as API from '../apis/api';

export const updateCurrentNetwork = async network => {
  let newNetwork = network;
  if (network.value === CUSTOM) {
    const { networkFullUrl } = NetworkValidator.createFullNetworkURL(network.networkFullUrl);
    newNetwork = { networkFullUrl, ...network };
  }
  API.defineApi(newNetwork.networkFullUrl);
  getStore().dispatch(networkStateActions.updateCurrentNetwork(newNetwork));
  return newNetwork;
};

export const isConnected = () => Wallet.isConnectedCheck();
