/* eslint-disable no-unused-vars */
import { formatBalance } from '@polkadot/util';
import { SEEDWORDS } from './seedwords';
import { KEYPAIR_EDWARDS, KEYPAIR_SCHNORRKEL } from '../../../../lib/constants/api';

const ksmWallet = jest.genMockFromModule('./ksm-wallet.js');

ksmWallet.getAddress = (seedWords, keypairType) => {
  if (seedWords !== undefined) {
    switch (keypairType) {
      case KEYPAIR_EDWARDS.value:
        return 'DpBwnmm8eQtuEReBkY3p7otougXrPD9UFg6BFp1ttxEXKi2';
      case KEYPAIR_SCHNORRKEL.value:
        return 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte';
      default:
        throw new Error('Invalid Keypair Type');
    }
  }
};

ksmWallet.getBalance = async address => {
  if (address !== undefined) {
    return {
      address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
      balance: '1000000000000000',
      status: 200,
    };
  }
};

//dummy method
ksmWallet.isValidAddress = value => value.length === 48;

ksmWallet.createSeedWords = () => SEEDWORDS;

ksmWallet.valueFormatter = value => {
  const fBalance = formatBalance(value, true, 15);
  return fBalance;
};

ksmWallet.getSignMessage = async (account, message) => {
  const result = { message: { signedMessage: '0x1234dherub32ojds' } };
  return result;
};

export default ksmWallet;
