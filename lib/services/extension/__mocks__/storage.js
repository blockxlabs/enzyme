/* eslint-disable no-unused-vars */
import CryptoJS from 'crypto-js';
import jc from 'json-cycle';
import { ACCOUNTS } from './accounts';
import { TRANSACTIONS } from './transactions';
import * as StorageKeys from '../../../constants/storage-keys';

const storage = jest.genMockFromModule('./storage');

storage.getLocalStorage = async name => {
  switch (name) {
    case StorageKeys.ACCOUNTS: {
      return ACCOUNTS;
    }
    case StorageKeys.TRANSACTIONS: {
      return TRANSACTIONS;
    }
    default: {
      return { accounts: JSON.stringify(ACCOUNTS), transactions: JSON.stringify(TRANSACTIONS) };
    }
  }
};

storage.encrypt = (value, hashKey) => {
  const recipher = CryptoJS.AES.encrypt(JSON.stringify(value), hashKey);
  return JSON.stringify(jc.decycle(recipher));
};

storage.decrypt = (cipher, hashKey) => {
  const cyclicCipher = jc.retrocycle(JSON.parse(cipher));
  const bytes = CryptoJS.AES.decrypt(cyclicCipher, hashKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
};

storage.setLocalStorage = (name, value) => {};
export default storage;
