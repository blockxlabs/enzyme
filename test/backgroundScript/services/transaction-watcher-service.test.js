import * as TransactionWatcherService from '../../../backgroundScript/services/transaction-watcher-service';
import * as TransactionResult from './__result__/transaction-result';
import * as API from '../../../backgroundScript/apis/api';
import { DEFAULT_NETWORK } from '../../../lib/constants/networks';

jest.mock('../../../backgroundScript/apis/tx');
jest.mock('../../../backgroundScript/services/transaction-watcher-service');

test('Submit Transaction', async () => {
  API.connectToApi(DEFAULT_NETWORK);
  const transaction = await TransactionWatcherService.submitTransaction(
    TransactionResult.CONFIRM_TRANSACTION,
  );
  expect(transaction).toMatchObject(TransactionResult.SUBMIT_TRANSACTION);
});
