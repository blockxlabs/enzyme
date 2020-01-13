import * as StaticMessageFactoryService from '../../../lib/services/static-message-factory-service';
import * as TransactionResult from '../../backgroundScript/services/__result__/transaction-result';

test('create transaction toast message for success', async () => {
  const message = {
    message: 'Transaction was successful with hash 0x27fd...db65',
    type: 'success',
  };
  const result = StaticMessageFactoryService.createTransactionToastMessage(
    TransactionResult.SUBMITED_SUCCESS_TRANSACTION,
  );
  expect(result).toMatchObject(message);
});

test('create transaction toast message for pending', async () => {
  const message = {
    message: 'Transaction failed with hash 0x27fd...db65',
    type: 'error',
  };
  const result = StaticMessageFactoryService.createTransactionToastMessage(
    TransactionResult.SUBMIT_TRANSACTION,
  );
  expect(result).toMatchObject(message);
});

test('Get Transactions status pill color for Success', async () => {
  const color = 'rgba(34, 165, 105, 1)';
  const result = StaticMessageFactoryService.getTransactionStatusPillColor(
    TransactionResult.SUBMITED_SUCCESS_TRANSACTION,
  );
  expect(result).toBe(color);
});

test('Get Transactions status pill color for Pending', async () => {
  const color = 'rgba(215, 95, 160, 1)';
  const result = StaticMessageFactoryService.getTransactionStatusPillColor(
    TransactionResult.SUBMIT_TRANSACTION,
  );
  expect(result).toBe(color);
});

test('Get Transactions status pill color for Fail', async () => {
  const color = 'rgba(34, 165, 105, 1)';
  const result = StaticMessageFactoryService.getTransactionStatusPillColor(
    TransactionResult.SUBMITED_FAIL_TRANSACTION,
  );
  expect(result).toBe(color);
});

test('Get Transactions Amount', async () => {
  const result = StaticMessageFactoryService.getTransactionAmount(
    TransactionResult.SUBMIT_TRANSACTION,
  );
  expect(result).toBe('Sent 2.000f DOT');
});
test('Get Transactions For Display', async () => {
  const transactions = [
    TransactionResult.SUBMIT_TRANSACTION,
    TransactionResult.SUBMITED_FAIL_TRANSACTION,
    TransactionResult.SUBMITED_SUCCESS_TRANSACTION,
  ];
  const result = StaticMessageFactoryService.getTransactionsToDisplay(transactions);
  expect(result[0].color).toBe('rgba(215, 95, 160, 1)');
  expect(result[0].transferAmount).toBe('Sent 2.000f DOT');
  expect(result[1].color).toBe('rgba(34, 165, 105, 1)');
  expect(result[1].transferAmount).toBe('Sent 2.000f DOT');
  expect(result[1].color).toBe('rgba(34, 165, 105, 1)');
  expect(result[1].transferAmount).toBe('Sent 2.000f DOT');
});

test('Display relative Time', async () => {
  const transactions = [
    TransactionResult.SUBMIT_TRANSACTION,
    TransactionResult.SUBMITED_FAIL_TRANSACTION,
    TransactionResult.SUBMITED_SUCCESS_TRANSACTION,
  ];
  const result = StaticMessageFactoryService.getTransfersWithMoment(transactions);
  expect(result[0].modifiedDate).toBe('May 30,2019');
});
