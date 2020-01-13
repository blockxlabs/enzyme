import * as DappService from '../../../backgroundScript/services/dapp-service';

jest.mock('../../../backgroundScript/services/store/account-store');
jest.mock('../../../backgroundScript/apis/core-kusama/ksm-wallet.js');

export const data = {
  request: {
    id: '_0w5w6dev8',
    request: {
      metadata: { url: 'polkadot.js.org' },
      opts: {
        address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
        genesisHash: '0xdcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b',
        message: 'Hello',
      },
      requestType: 'SIGN_MESSAGE',
      type: 'DAPP/SIGN_MESSAGE',
    },
    result: {
      account: {
        address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
      },
      chain: 'Kusama',
      message: { message: 'Hello' },
    },
    sender: {
      frameId: 0,
      id: 'coebhjhklmpbhclfkldgadjhggikhhok',
      tab: {
        active: true,
        audible: false,
        autoDiscardable: true,
        discarded: false,
        favIconUrl: 'https://polkadot.js.org/apps/favicon.ico',
        height: 754,
        highlighted: true,
        id: 480,
        incognito: false,
        index: 3,
        mutedInfo: { muted: false },
        pinned: false,
        selected: true,
        status: 'complete',
        title: 'Polkadot/Substrate Portal',
        url: 'https://polkadot.js.org/apps/#/accounts',
        width: 973,
        windowId: 1,
      },
    },
  },
  url: 'https://polkadot.js.org/apps/#/accounts',
  type: 'DAPP/GET_SIGN_MESSAGE',
};

describe('validating getSignMessage by Dapp', () => {
  describe('Positive Test case of validating getSignMessage by Dapp ', () => {
    test('getSignMessage', async () => {
      const EXPECTED_RESULT = {
        result: true,
        requestID: '_0w5w6dev8',
        replyData: {
          id: 480,
          message: {
            status: 200,
            message: 'success',
            result: {},
            origin: undefined,
            type: 'DAPP/CONTENT_SCRIPT_RESPONSE',
          },
        },
      };
      const result = await DappService.getSignMessage(data);
      expect(result).toMatchObject(EXPECTED_RESULT);
    });
  });
  describe('Nagative Test case of validating getSignMessage by Dapp ', () => {
    test('getSignMessage should fail for undefined argument', async () => {
      try {
        await DappService.getSignMessage();
      } catch (err) {
        expect(err.message).toMatchObject('The request requires data.');
      }
    });
    test('getSignMessage should fail for empty argument', async () => {
      try {
        const data = null;
        await DappService.getSignMessage(data);
      } catch (err) {
        expect(err.message).toMatchObject('The request requires data.');
      }
    });
  });
});
