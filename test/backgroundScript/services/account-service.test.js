import * as AccountService from '../../../backgroundScript/services/account-service';

jest.mock('../../../lib/services/extension/storage');
jest.mock('../../../backgroundScript/apis/dot-wallet');

const seedWords = 'furnace barrel magnet silly monster will delay giggle battle tumble mail lock';

test('getAccounts', async () => {
  const accounts = await AccountService.getAccounts();
  expect(accounts.ciphertext).toBeDefined();
});

test('create seedWords', async () => {
  const result = await AccountService.createSeedWords();
  expect(result).toMatch(seedWords);
});

// check for genrated account address
test('create account', async () => {
  const address = await AccountService.createAccount();
  expect(address.length).toEqual(48);
});

// check for address
test('import account using existing seedWords', async () => {
  const address = await AccountService.createAccount(seedWords);
  expect(address.length).toBe(48);
  expect(address).toMatch('5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH');
});
