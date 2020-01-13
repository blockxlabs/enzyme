import * as DappTransactionService from '../../../backgroundScript/services/dapp-transaction-service';

jest.mock('../../../backgroundScript/apis/fees');
jest.mock('../../../backgroundScript/apis/core-polkadot/dot-wallet.js');
jest.mock('../../../backgroundScript/apis/chain');

const txnPayload = {
  address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
  blockHash: '0x8c830ebb7759a88f96f3b643c7035c14de47cf3a57a9c93e945dc7ce9b5d8b85',
  blockNumber: '0x00000000003c77da',
  era: '0xa501',
  genesisHash: '0xdcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b',
  method: '0x0300ff2a7f4e5f72ce1c831aeafc7efc799006410383a76a2e7cefd592585d9fa1317500',
  nonce: '0x0000000000000160',
  specVersion: '0x00000070',
  tip: '0x00000000000000000000000000000000',
  version: 1,
};

const TXN_VALIDATION_RESULT = {
  txnForUI: {
    address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
    blockHash: '0x8c830ebb7759a88f96f3b643c7035c14de47cf3a57a9c93e945dc7ce9b5d8b85',
    chain: 'Alexander',
    sVersion: 112,
    mortality: 'mortal, valid from #3,962,842 to #3,962,906',
    nonce: '352',
    tip: '0',
    sectionName: 'balances',
    method: 'balances.transfer',
    note:
      " Transfer some liquid free balance to another account.   `transfer` will set the `FreeBalance` of the sender and receiver.  It will decrease the total issuance of the system by the `TransferFee`.  If the sender's account is below the existential deposit as a result  of the transfer, the account will be reaped.   The dispatch origin for this call must be `Signed` by the transactor.",
    url: 'http://polkadot.js.org/apps',
    transferFee: '4.370m Unit',
    transferAmount: '0',
    totalTransferAmount: '4.370m Unit',
  },
  txnPayload: {
    address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
    blockHash: '0x8c830ebb7759a88f96f3b643c7035c14de47cf3a57a9c93e945dc7ce9b5d8b85',
    blockNumber: '0x00000000003c77da',
    era: '0xa501',
    genesisHash: '0xdcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b',
    method: '0x0300ff2a7f4e5f72ce1c831aeafc7efc799006410383a76a2e7cefd592585d9fa1317500',
    nonce: '0x0000000000000160',
    specVersion: '0x00000070',
    tip: '0x00000000000000000000000000000000',
    version: 1,
  },
};

describe('validating send transaction by Dapp', () => {
  describe('Positive Test case of validating send transaction by Dapp ', () => {
    test('decode Transactions', async () => {
      try {
        const request = { url: 'http://polkadot.js.org/apps', txnPayload };
        const transactionForUi = await DappTransactionService.validateDappTransaction(request);
        expect(transactionForUi).toMatchObject(TXN_VALIDATION_RESULT);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
  describe('Negative Test case of validating send transaction by Dapp', () => {
    test('validating send transaction by Dapp Fail for undefined txnPayload', async () => {
      try {
        const request = { url: 'http://polkadot.js.org/apps' };
        const transactionForUi = await DappTransactionService.validateDappTransaction(request);
        expect(transactionForUi).toMatchObject({
          message: 'The request requires transaction payload.',
          status: 400,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });

    test('validating send transaction by Dapp Fail for empty address object', async () => {
      try {
        const payload = {
          address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
          blockHash: '0x8c830ebb7759a88f96f3b643c7035c14de47cf3a57a9c93e945dc7ce9b5d8b85',
        };
        const request = {
          url: 'http://polkadot.js.org/apps',
          txnPayload: payload,
        };
        const transactionForUi = await DappTransactionService.validateDappTransaction(request);
        expect(transactionForUi).toMatchObject({
          message: 'The request requires blockNumber.',
          status: 400,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });

    test('decode Transactions', async () => {
      try {
        const payload = { address: '' };
        const request = {
          url: 'http://polkadot.js.org/apps',
          txnPayload: payload,
        };
        const transactionForUi = await DappTransactionService.validateDappTransaction(request);
        expect(transactionForUi).toMatchObject({
          message: 'The request requires address.',
          status: 400,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });

    test('decode Transactions', async () => {
      try {
        const payload = {
          address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
        };
        const request = {
          url: 'http://polkadot.js.org/apps',
          txnPayload: payload,
        };
        const transactionForUi = await DappTransactionService.validateDappTransaction(request);
        expect(transactionForUi).toMatchObject({
          message: 'The request requires blockHash.',
          status: 400,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
});
