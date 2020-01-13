import { getStore } from '../store/store-provider';
import * as StorageServices from '../../lib/services/extension/storage';
import { ADDRESS_BOOK } from '../../lib/constants/storage-keys';

let currentValue;
export const handleChange = async () => {
  const previousValue = currentValue;
  currentValue = getStore().getState().addressBookState;
  if (previousValue !== currentValue) {
    const {
      appState: { hashKey },
      addressBookState,
    } = getStore().getState();
    if (hashKey !== undefined) {
      const encryptedAddressBookState = StorageServices.encrypt(addressBookState, hashKey);
      await StorageServices.setLocalStorage(ADDRESS_BOOK, encryptedAddressBookState);
    }
  }
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = getStore().subscribe(handleChange);
