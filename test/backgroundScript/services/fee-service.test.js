import * as FeeService from '../../../backgroundScript/services/fee-service';
import * as TransactionResult from './__result__/transaction-result';

jest.mock('../../../backgroundScript/apis/fees');
const address = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';
const toAddress = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';

test('Filter Transactions', async () => {
  const allFees = await FeeService.getTransferFees(address, toAddress);
  expect(allFees).toMatchObject(TransactionResult.FEES);
});
