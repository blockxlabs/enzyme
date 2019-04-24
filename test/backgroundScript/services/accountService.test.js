import * as AccountService from '../../../backgroundScript/services/accountService';
import * as mockStorage from '../../lib/constants/mockStorage';
import { mockAccounts } from '../../lib/constants/appState';
import * as StorageServices from '../../../lib/services/extension/storage';
import * as Wallet from '../../../backgroundScript/apis/dotWallet';

const assert = require('assert');

describe('getAccounts', async () => {
  it('get account from local storage', async () => {
    const mock = jest.spyOn(StorageServices, 'getLocalStorage');
    mock.mockImplementation(() => mockStorage.account);
    const accounts = await AccountService.getAccounts();
    assert.equal(
      JSON.stringify(accounts),
      JSON.stringify(mockStorage.account),
      'Result should be match with mock Result',
    );
  });
});

describe('create seedWords', async () => {
  it('get account from local storage', async () => {
    const seedWords = 'furnace barrel magnet silly monster will delay giggle battle tumble mail lock';
    const mock = jest.spyOn(Wallet, 'createSeedWords');
    mock.mockImplementation(() => seedWords);
    const result = await AccountService.createSeedWords();
    assert.equal(result, seedWords, 'Result should be match with mock Result');
  });
});

describe('create account', async () => {
  it('create new account during onboarding', async () => {
    const mockEncrypt = jest.spyOn(StorageServices, 'encrypt');
    mockEncrypt.mockImplementation(() => mockAccounts);
    const mockSetLocalStorage = jest.spyOn(StorageServices, 'setLocalStorage');
    mockSetLocalStorage.mockImplementation(() => {});
    const address = await AccountService.createAccount();
    // check for address
    assert.equal(address.length, 48, 'address should be 48 character long');
  });
});

describe('import account using existing seedWords', async () => {
  it('create new account during onboarding', async () => {
    const seedWords = 'furnace barrel magnet silly monster will delay giggle battle tumble mail lock';
    const mockEncrypt = jest.spyOn(StorageServices, 'encrypt');
    mockEncrypt.mockImplementation(() => mockAccounts);
    const mockSetLocalStorage = jest.spyOn(StorageServices, 'setLocalStorage');
    mockSetLocalStorage.mockImplementation(() => {});
    const address = await AccountService.createAccount(seedWords);
    // check for address
    assert.equal(address.length, 48, 'address should be 48 character long');
    assert.equal(
      address,
      '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
      'Address should be generated same',
    );
  });
});
