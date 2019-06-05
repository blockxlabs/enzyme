import { CONFIRM_TRANSACTION } from './transaction';

const tx = jest.genMockFromModule('./tx.js');

// mock transferAndWatch
tx.transferAndWatch = async (seedWords, keypairType, transaction) => {
  if (
    seedWords === 'throw shoulder coil truly fox weapon boss predict quantum surface tube crime'
  ) {
    if (keypairType === 'sr25519') {
      if (transaction === CONFIRM_TRANSACTION) {
        return true;
      }
    }
  } else {
    throw new Error();
  }
};

export default tx;
