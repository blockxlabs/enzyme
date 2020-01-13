import { getBalances } from '../../../backgroundScript/services/balance-service';
import { BAD_REQUEST } from '../../../lib/constants/api';

jest.mock('../../../backgroundScript/apis/core-kusama/ksm-wallet.js');

const ADDRESS_ERROR = {
  status: BAD_REQUEST,
  message: 'The request requires addresses.',
};

const expectedResult = [
  {
    address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
    status: 200,
    balance: '1000000000000000',
  },
];
describe('getBalance', () => {
  describe('getBalance Positive test case', () => {
    test('getBalances should return balance object', async () => {
      const addresses = ['DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte'];
      const balances = await getBalances(addresses);
      expect(balances).toMatchObject(expectedResult);
    });
  });
  describe('getBalance Negative test case', () => {
    test('getBalances should fail for undefined addresses input', async () => {
      const balances = await getBalances();
      expect(balances).toMatchObject(ADDRESS_ERROR);
    });

    test('getBalances should fail for empty addresses input', async () => {
      const addresses = '';
      const balances = await getBalances(addresses);
      expect(balances).toMatchObject(ADDRESS_ERROR);
    });
  });
});
