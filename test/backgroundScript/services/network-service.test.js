/* eslint-disable no-unused-vars */
import * as NetworkService from '../../../backgroundScript/services/network-service';
import * as MockData from '../../lib/constants/app-state';

jest.mock('../../../lib/services/extension/storage');

test('updateCurrentNetwork', async () => {
  const result = await NetworkService.updateCurrentNetwork(
    MockData.mockNetwork,
    MockData.mockHashKey,
  );
  expect(MockData.mockNetwork).toMatchObject(result);
});
