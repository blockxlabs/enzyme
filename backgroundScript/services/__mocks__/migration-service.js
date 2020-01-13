import * as StorageService from '../../../lib/services/extension/storage';
import * as Migrations from '../../migrations';
import { DEFAULT_NETWORK } from '../../../lib/constants/networks';
import { SERIAL_VERSION } from '../../../lib/constants/storage-keys';

const MigrationService = jest.genMockFromModule('./migration-service');

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
        ? { currentNetwork: DEFAULT_NETWORK }
        : StorageService.decrypt(network, hashKey),
    serialVersion: serialVersion === undefined ? 1 : StorageService.decrypt(serialVersion, hashKey),
  };
};

const migrationBySerialVersionLookup = (lookupStr, data) => {
  switch (lookupStr) {
    case '1TO2': {
      return Migrations.migration1to2(data);
    }
    case '2TO3': {
      return Migrations.migration2to3(data);
    }
    case '3TO4': {
      return Migrations.migration3to4(data);
    }
    case '4TO5': {
      return Migrations.migration4to5(data);
    }
    default:
      throw new Error('Migration Fail..');
  }
};

const updateSerialVersion = async (serialVersion, hashKey) => {
  const encryptedSerialVersion = StorageService.encrypt(serialVersion, hashKey);
  await StorageService.setLocalStorage(SERIAL_VERSION, encryptedSerialVersion);
};

MigrationService.startMigration = async (localStorageData, hashKey) => {
  // decryptData
  let decryptedStorageData = decryptDataset(localStorageData, hashKey);
  // migration
  while (decryptedStorageData.serialVersion !== 5) {
    const lookupStr = `${decryptedStorageData.serialVersion}TO${decryptedStorageData.serialVersion
      + 1}`;
    decryptedStorageData = migrationBySerialVersionLookup(lookupStr, decryptedStorageData);
  }
  //update serialVersion
  await updateSerialVersion(decryptedStorageData.serialVersion, hashKey);
  return decryptedStorageData;
};

export default MigrationService;
