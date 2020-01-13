import { formatBalance } from '@polkadot/util';
import { SEEDWORDS } from './seedwords';
import { KEYPAIR_EDWARDS, KEYPAIR_SCHNORRKEL } from '../../../../lib/constants/api';

const dotWallet = jest.genMockFromModule('./dot-wallet.js');

dotWallet.getAddress = (seedWords, keypairType) => {
  if (seedWords !== undefined) {
    switch (keypairType) {
      case KEYPAIR_EDWARDS.value:
        return '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';
      case KEYPAIR_SCHNORRKEL.value:
        return '5Ec2Jynt51iGkzNNriymyYnhjV2LHANk1wdv1eNEcTp4zBsQ';
      default:
        throw new Error('Invalid Keypair Type');
    }
  }
};

dotWallet.getBalance = async address => {
  if (address !== undefined) {
    return {
      address: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
      balance: '1000000000000000',
      status: 200,
    };
  }
};

//dummy method
dotWallet.isValidAddress = value => value.length === 48;

dotWallet.createSeedWords = () => SEEDWORDS;

dotWallet.valueFormatter = value => {
  const fBalance = formatBalance(value, true, 15);
  return fBalance;
};

export default dotWallet;
