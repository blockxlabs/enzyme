import * as Fees from '../apis/fees';
import { getStore } from '../store/storeProvider';

export const getTransferFees = async toAddress => {
  const { networkState, accounts } = getStore().getState();
  const { networkFullUrl } = networkState.currentNetwork;
  const { address } = accounts.currentAccount;
  const fees = await Fees.transferFees(networkFullUrl, address, toAddress);
  return fees;
};
