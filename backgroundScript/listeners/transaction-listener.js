import { getStore } from '../store/store-provider';
import * as StorageServices from '../../lib/services/extension/storage';
import { TRANSACTIONS } from '../../lib/constants/storage-keys';

let currentValue;
export const handleChange = async () => {
  const previousValue = currentValue;
  currentValue = getStore().getState().transactionState;

  if (previousValue !== currentValue) {
    const { transactionArr } = currentValue;

    if (transactionArr.length > 0) {
      const {
        appState: { hashKey },
      } = getStore().getState();

      if (hashKey !== undefined) {
        const encryptedTransactionState = StorageServices.encrypt(currentValue, hashKey);
        await StorageServices.setLocalStorage(TRANSACTIONS, encryptedTransactionState);
      }
    }
  }
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = getStore().subscribe(handleChange);
