/* eslint-disable no-unused-vars */
import * as TransactionService from '../../../backgroundScript/services/transactionService';
import { mockTransactionArr } from '../../lib/constants/transactionState';

const assert = require('assert');

describe('Filter Transactions', async () => {
  it('Filter Transaction from Transaction List', async () => {
    const { transactionArr } = mockTransactionArr;
    const address = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';
    const network = { value: 'polkadot' };
    const transaction = await TransactionService.filterTransactions(
      transactionArr,
      network,
      address,
    );

    assert.equal(
      JSON.stringify(transaction[0].internal.address),
      JSON.stringify(address),
      'Result should be match with address',
    );
    assert.equal(
      JSON.stringify(transaction[0].internal.network),
      JSON.stringify(network),
      'Result should be match with network',
    );
  });
});
