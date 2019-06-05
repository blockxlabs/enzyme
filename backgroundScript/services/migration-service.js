import * as Migrations from '../migrations';
import * as StorageService from '../../lib/services/extension/storage';
import { ALEXANDER_NETWORK } from '../../lib/constants/networks';
import { SERIAL_VERSION } from '../../lib/constants/storage-keys';
import AppConfig from '../../lib/constants/config';

const decryptDataset = (data, hashKey) => {
  const {
    accounts, transactions, network, serialVersion
  } = data;
  return {
    accounts: StorageService.decrypt(accounts, hashKey),
    transactions:
      transactions === undefined
        ? { transactionArr: [] }
        : StorageService.decrypt(transactions, hashKey),
    network:
      network === undefined
        ? { currentNetwork: ALEXANDER_NETWORK }
        : StorageService.decrypt(network, hashKey),
    serialVersion: serialVersion === undefined ? 1 : StorageService.decrypt(serialVersion, hashKey),
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
  // decryptData
  let decryptedStorageData = decryptDataset(localStorageData, hashKey);

  // migration
  while (decryptedStorageData.serialVersion !== AppConfig.serialVersion) {
    const lookupStr = `${decryptedStorageData.serialVersion}TO${decryptedStorageData.serialVersion
      + 1}`;
    decryptedStorageData = migrationBySerialVersionLookup(lookupStr, decryptedStorageData);
  }
  //update serialVersion
  await updateSerialVersion(decryptedStorageData.serialVersion, hashKey);
  return decryptedStorageData;
};
