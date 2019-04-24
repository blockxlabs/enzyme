import * as Fees from '../apis/fees';
import { getStore } from '../store/storeProvider';

export const getTransferFees = async toAddress => {
  const {
    networkState: {
      currentNetwork: { networkFullUrl },
    },
    accountState: {
      currentAccount: { address },
    },
  } = getStore().getState();
  const fees = await Fees.transferFees(networkFullUrl, address, toAddress);
  return fees;
};
