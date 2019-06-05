import * as MigrationService from '../../../backgroundScript/services/migration-service';
import * as StorageService from '../../../lib/services/extension/storage';
import { mockHashKey } from '../../lib/constants/app-state';

jest.mock('../../../lib/services/extension/storage');
jest.mock('../../../backgroundScript/services/migration-service');
jest.mock('../../../backgroundScript/migrations');

test('Start Migration 1 to 5', async () => {
  const localStorage = await StorageService.getLocalStorage();
  const result = await MigrationService.startMigration(localStorage, mockHashKey);
  expect(result.serialVersion).toBe(5);
});
