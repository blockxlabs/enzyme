/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setChain } from './chain';

const connection = {
  isConnected: false,
  api: null,
  provider: null,
  currentNetwork: null,
};

const disconnect = () => {
  if (connection.isConnected) {
    try {
      connection.provider.disconnect();
      connection.isConnected = false;
      connection.provider = null;
      connection.api = null;
      connection.currentNetwork = null;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Could not disconnect polkadot while resetting');
    }
  }
};

const connect = async network => {
  const { networkFullUrl, name } = network;
  if (name === 'dotcustom') {
    disconnect();
  }
  if (networkFullUrl !== undefined && networkFullUrl !== null && networkFullUrl !== '') {
    disconnect();
    try {
      const provider = new WsProvider(networkFullUrl);
      const api = await ApiPromise.create({ provider });
      api.on('disconnected', () => {
        disconnect();
      });

      // set connection
      connection.provider = provider;
      connection.isConnected = provider.isConnected();
      connection.api = api;
      connection.currentNetwork = network;
      await setChain(api);
      return connection;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error in polkadot connection');
    }
  }
};

// call when network changes
export const connectToApi = async network => {
  const { networkFullUrl } = network;
  if (connection.isConnected) {
    if (connection.currentNetwork.networkFullUrl === networkFullUrl) {
      return connection;
    }
  }
  return connect(network);
};

export const getApi = () => connection.api;

export const isConnected = () => connection.isConnected;
