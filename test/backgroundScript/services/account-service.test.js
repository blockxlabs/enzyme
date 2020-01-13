/* eslint-disable no-unused-vars */
import * as AccountService from '../../../backgroundScript/services/account-service';
import * as MockResult from './__result__/account-result';
import { DUPLICATE_ALIAS } from '../../../lib/constants/api';

jest.mock('../../../lib/services/extension/storage');
jest.mock('../../../backgroundScript/services/store/account-store');
jest.mock('../../../backgroundScript/apis/core-kusama/ksm-wallet.js');

const seedWords = 'furnace barrel magnet silly monster will delay giggle battle tumble mail lock';

describe('validateAlias', () => {
  describe('validateAlias positive test case', () => {
    test('validateAlias should throw error for duplicate alias ', async () => {
      try {
        const result = AccountService.validateAlias('ed25515');
      } catch (err) {
        expect(err.message).toBe(DUPLICATE_ALIAS.toString());
      }
    });

    test('validateAlias should return new Alias', async () => {
      try {
        const result = AccountService.validateAlias('newAlias');
        expect(result).toMatch('newAlias');
      } catch (Err) {
        // eslint-disable-next-line no-console
        console.log(Err);
      }
    });
  });

  describe('validateAlias negative test case', () => {
    test('validateAlias should throw error for alias', async () => {
      try {
        const result = AccountService.validateAlias();
      } catch (err) {
        expect(err.message).toBe('alias in required');
      }
    });
  });
});

test('getAccounts', async () => {
  const accounts = await AccountService.getAccounts();
  expect(accounts.ciphertext).toBeDefined();
});

test('create seedWords', async () => {
  const result = await AccountService.createSeedWords();
  expect(result).toBeDefined();
  const seedWordsArray = result.split(' ');
  expect(seedWordsArray.length).toEqual(12);
});

// check for genrated account address
test('create account', async () => {
  const { address } = await AccountService.createAccount();
  expect(address.length).toEqual(48);
});

// check for address
test('import account using existing seedWords', async () => {
  const { address } = await AccountService.createAccount(seedWords);
  expect(address.length).toBe(48);
  expect(address).toMatch('5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH');
});

describe(' get Full account object for sign Txn ', () => {
  describe('getAccount positive test case', () => {
    // check for address
    test('getAccount using address', () => {
      const address = 'DpBwnmm8eQtuEReBkY3p7otougXrPD9UFg6BFp1ttxEXKi2';
      const account = AccountService.getAccount(address);
      expect(account).toMatchObject({
        address: 'DpBwnmm8eQtuEReBkY3p7otougXrPD9UFg6BFp1ttxEXKi2',
        alias: 'ed25515',
        keypairType: 'ed25519',
        seedWords:
          'trumpet knife surface whale shoulder vague feed island original curve laundry dolphin',
      });
    });
  });
  describe('getAccount negative test case', () => {
    // check for address
    test(' throw error for invalid address', () => {
      const address = 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte';
      try {
        AccountService.getAccount(address);
      } catch (err) {
        expect(err.message).toMatch('Account is not exist');
      }
    });

    test('throw error for empty address', () => {
      const address = '';
      const account = AccountService.getAccount(address);
      expect(account).toMatchObject({
        status: 400,
        message: 'The request requires address.',
      });
    });

    test('throw error for undefined address', () => {
      const account = AccountService.getAccount();
      expect(account).toMatchObject({
        status: 400,
        message: 'The request requires address.',
      });
    });
  });
});

describe('accountForDapp', () => {
  describe('accountForDapp positive test case', () => {
    test('accountForDapp return account for authorise Dapp', async () => {
      const accounts = await AccountService.accountForDapp(MockResult.accountState);
      expect(accounts).toMatchObject(MockResult.accountForDapp);
    });
  });

  describe('accountForDapp negative test case', () => {
    test('accountForDapp should fail for undefined accountState object', async () => {
      const accounts = await AccountService.accountForDapp();
      expect(accounts).toMatchObject(MockResult.BAD_REQUEST);
    });

    test('accountForDapp should fail for empty accountState object', async () => {
      const accountState = {};
      const accounts = await AccountService.accountForDapp(accountState);
      expect(accounts).toMatchObject({
        message: 'The request requires proper accountState.',
        status: 400,
      });
    });
  });
});

describe('updateAccountAlias', () => {
  describe('updateAccountAlias positive test case', () => {
    test('updateAccountAlias should fail for duplicate alais name', async () => {
      try {
        const address = 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte';
        const newAlias = 'kusama';
        const account = await AccountService.updateAccountAlias(address, newAlias);
      } catch (err) {
        expect(err.message).toMatch('Duplicate alias');
      }
    });
    test('updateAccountAlias for polkadot account', async () => {
      const address = 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte';
      const newAlias = 'newAlias';
      const account = await AccountService.updateAccountAlias(address, newAlias);
      expect(account).toMatchObject(MockResult.updateAliasResponse);
    });
  });
  describe('updateAccountAlias negative test case', () => {
    test('updateAccountAlias should fail for unavalible account', async () => {
      try {
        const address = 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte';
        const newAlias = 'Account3';
        const account = await AccountService.updateAccountAlias(address, newAlias);
      } catch (err) {
        expect(err.message).toMatch('account is not avalible');
      }
    });
  });
});
