import { getStore } from '../store/store-provider';
import * as StorageServices from '../../lib/services/extension/storage';
import { NETWORK } from '../../lib/constants/storage-keys';

let currentValue;
export const handleChange = async () => {
  const previousValue = currentValue;
  currentValue = getStore().getState().networkState;

  if (previousValue !== currentValue) {
    const { currentNetwork } = currentValue;

    if (currentNetwork !== undefined) {
      const {
        appState: { hashKey },
      } = getStore().getState();

      if (hashKey !== undefined) {
        const encryptedNetworkState = StorageServices.encrypt(currentValue, hashKey);
        await StorageServices.setLocalStorage(NETWORK, encryptedNetworkState);
      }
    }
  }
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = getStore().subscribe(handleChange);
