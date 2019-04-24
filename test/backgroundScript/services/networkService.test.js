/* eslint-disable no-unused-vars */
import * as NetworkService from '../../../backgroundScript/services/networkService';
import * as MockData from '../../lib/constants/appState';
import * as StorageServices from '../../../lib/services/extension/storage';

const assert = require('assert');

describe('updateCurrentNetwork', async () => {
  it('update Current Network and stored into local storage', async () => {
    const mockSetLocalStorage = jest.spyOn(StorageServices, 'setLocalStorage');
    mockSetLocalStorage.mockImplementation(() => {});
    const result = await NetworkService.updateCurrentNetwork(
      MockData.mockNetwork,
      MockData.mockHashKey,
    );
    assert.equal(MockData.mockNetwork, result, 'result should be match');
  });
});
