import * as appService from '../../../backgroundScript/services/app-service';
import { mockHashKey } from '../../lib/constants/app-state';

jest.mock('../../../lib/services/extension/storage');

test('Make app Ready', async () => {
  const result = await appService.appReady(mockHashKey);
  expect(result).toMatch(mockHashKey);
});
