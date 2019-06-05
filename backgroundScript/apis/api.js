/* eslint-disable import/no-extraneous-dependencies */
import ApiPromise from '@polkadot/api/promise';
import { WsProvider } from '@polkadot/rpc-provider';

const connectivity = {
  isConnected: false,
  provider: null,
  api: null,
  currentNetworkUrl: 'incorrecturl',
};

const reset = networkFullUrl => {
  try {
    connectivity.provider.disconnect();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Could not disconnect while resetting');
  }

  connectivity.isConnected = false;
  connectivity.provider = null;
  connectivity.api = undefined;
  connectivity.currentNetworkUrl = networkFullUrl;
};

// call when network changes
export const defineApi = async networkFullUrl => {
  reset(networkFullUrl);
  connectivity.provider = new WsProvider(networkFullUrl);
  connectivity.api = new ApiPromise({ provider: connectivity.provider });
  connectivity.api.on('connected', () => {
    connectivity.isConnected = true;
  });
  connectivity.api.on('disconnected', () => {
    connectivity.isConnected = false;
  });
};

export const getApi = () => connectivity.api;

export const isConnected = () => connectivity.isConnected;
