/* eslint-disable no-unused-vars */
import * as NetworkService from '../../../backgroundScript/services/network-service';
import * as MockData from '../../lib/constants/app-state';
import { BAD_REQUEST } from '../../../lib/constants/api';

jest.mock('../../../lib/services/extension/storage');

const NETWORK_ERROR = {
  status: BAD_REQUEST,
  message: 'The request requires network.',
};

describe.only('updateCurrentNetwork', () => {
  describe('updateCurrentNetwork Positive test case', () => {
    test('updateCurrentNetwork', async () => {
      const result = await NetworkService.updateCurrentNetwork(MockData.mockNetwork);
      expect(MockData.mockNetwork).toMatchObject(result);
    });
  });
  describe('updateCurrentNetwork Negative test case', () => {
    test('updateCurrentNetwork should fail for undefined network input', async () => {
      const result = await NetworkService.updateCurrentNetwork();
      expect(result).toMatchObject(NETWORK_ERROR);
    });
    test('updateCurrentNetwork should fail for empty network input', async () => {
      const network = '';
      const result = await NetworkService.updateCurrentNetwork(network);
      expect(result).toMatchObject(NETWORK_ERROR);
    });
    test('updateCurrentNetwork should fail for null network input', async () => {
      const network = null;
      const result = await NetworkService.updateCurrentNetwork(network);
      expect(result).toMatchObject(NETWORK_ERROR);
    });
  });
});
