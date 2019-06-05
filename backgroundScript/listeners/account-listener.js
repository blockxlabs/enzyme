import { getStore } from '../store/store-provider';
import * as StorageServices from '../../lib/services/extension/storage';
import { ACCOUNTS } from '../../lib/constants/storage-keys';

let currentValue;
export const handleChange = async () => {
  const previousValue = currentValue;
  currentValue = getStore().getState().accountState;

  if (previousValue !== currentValue) {
    const { accounts, currentAccount } = currentValue;

    if (accounts.length > 0 && currentAccount !== undefined) {
      const {
        appState: { hashKey },
        accountState,
      } = getStore().getState();
      if (hashKey !== undefined) {
        const encryptedAccountState = StorageServices.encrypt(accountState, hashKey);
        await StorageServices.setLocalStorage(ACCOUNTS, encryptedAccountState);
      }
    }
  }
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = getStore().subscribe(handleChange);
