import { getStore } from '../store/store-provider';
import * as StorageServices from '../../lib/services/extension/storage';
import { PERMISSIONS } from '../../lib/constants/storage-keys';

let currentValue;
// eslint-disable-next-line import/prefer-default-export
export const handleChange = async () => {
  const previousValue = currentValue;
  currentValue = getStore().getState().permissionState;

  if (previousValue !== currentValue) {
    const { whiteListedDApps } = currentValue;

    if (Object.entries(whiteListedDApps).length > 0) {
      const {
        appState: { hashKey },
        permissionState,
      } = getStore().getState();
      if (hashKey !== undefined) {
        const encryptedPermissionState = StorageServices.encrypt(permissionState, hashKey);
        await StorageServices.setLocalStorage(PERMISSIONS, encryptedPermissionState);
      }
    }
  }
};

// eslint-disable-next-line no-unused-vars
const unsubscribe = getStore().subscribe(handleChange);
