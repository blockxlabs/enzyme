import { getBalances } from '../../../backgroundScript/services/balance-service';

jest.mock('../../../backgroundScript/apis/dot-wallet');

const expectedResult = [
  {
    address: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    status: 200,
    balance: '1000000000000000',
  },
];
test('getBalances', async () => {
  const addresses = ['5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH'];
  const balances = await getBalances(addresses);
  expect(balances).toMatchObject(expectedResult);
});
