import { getBalances } from '../../../backgroundScript/services/balanceService';
import * as DotWallet from '../../../backgroundScript/apis/dotWallet';

const assert = require('assert');

describe('getBalances', async () => {
  it('get balances from blockchain network', async () => {
    const mockBalanceObj = {
      address: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
      balance: '10000',
      status: 200,
    };
    const mock = jest.spyOn(DotWallet, 'getBalance');
    mock.mockImplementation(() => mockBalanceObj);
    const addresses = ['5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH'];
    const balances = await getBalances(addresses);
    assert(
      balances[0].address === '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
      'Balance object contain address',
    );
    assert(balances[0].status === 200, 'Balance object contain status');
    assert(balances[0].balance === '10000', 'Balance object contain balance');
  });
});
