import * as Migrations from '../migrations';
import * as StorageService from '../../lib/services/extension/storage';
import { DEFAULT_NETWORK } from '../../lib/constants/networks';
import { SERIAL_VERSION } from '../../lib/constants/storage-keys';
import AppConfig from '../../lib/constants/config';

const decryptDataset = (data, hashKey) => {
  const {
    accounts, transactions, network, serialVersion, permissions, addressBook
  } = data;
  return {
    accounts: StorageService.decrypt(accounts, hashKey),
    transactions:
      transactions === undefined
        ? { transactionArr: [] }
        : StorageService.decrypt(transactions, hashKey),
    network:
      network === undefined
        ? { currentNetwork: DEFAULT_NETWORK }
        : StorageService.decrypt(network, hashKey),
    serialVersion: serialVersion === undefined ? 1 : StorageService.decrypt(serialVersion, hashKey),
    permissions:
      permissions === undefined
        ? {
          whiteListedDApps: {},
        }
        : StorageService.decrypt(permissions, hashKey),
    addressBook:
      addressBook === undefined
        ? { addressBook: [] }
        : StorageService.decrypt(addressBook, hashKey),
  };
};

const migrationBySerialVersionLookup = (lookupStr, data) => {
  switch (lookupStr) {
    case '1TO2': {
      return Migrations.migration1to2(data);
    }
    default:
      throw new Error('Migration Fail..');
  }
};

const updateSerialVersion = async (serialVersion, hashKey) => {
  const encryptedSerialVersion = StorageService.encrypt(serialVersion, hashKey);
  await StorageService.setLocalStorage(SERIAL_VERSION, encryptedSerialVersion);
};

export const startMigration = async (localStorageData, hashKey) => {
  try {
    // decryptData
    let decryptedStorageData = decryptDataset(localStorageData, hashKey);

    // migration
    while (decryptedStorageData.serialVersion !== AppConfig.serialVersion) {
      const lookupStr = `${
        decryptedStorageData.serialVersion
      }TO${decryptedStorageData.serialVersion + 1}`;
      decryptedStorageData = migrationBySerialVersionLookup(lookupStr, decryptedStorageData);
    }
    //update serialVersion
    await updateSerialVersion(decryptedStorageData.serialVersion, hashKey);
    return decryptedStorageData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in migration service..contact developer team');
  }
};
