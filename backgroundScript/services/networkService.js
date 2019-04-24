import { getStore } from '../store/storeProvider';
import * as networkStateActions from '../actions/networks';
import * as StorageServices from '../../lib/services/extension/storage';
import { NETWORK } from '../../lib/constants/storageKeys';

export const updateCurrentNetwork = async (network, hashKey) => {
  getStore().dispatch(networkStateActions.updateCurrentNetwork(network));
  const encryptedNetwork = StorageServices.encrypt(network, hashKey);
  await StorageServices.setLocalStorage(NETWORK, encryptedNetwork);
  return network;
};
