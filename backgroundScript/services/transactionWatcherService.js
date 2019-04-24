import * as TransactionTypes from '../../lib/constants/transaction';
import { getStore } from '../store/storeProvider';
import * as Tx from '../apis/tx';

export const submitTransaction = async transactionObj => {
  const {
    networkState: {
      currentNetwork: { networkFullUrl },
    },
    accountState: {
      currentAccount: { seedWords },
    },
  } = getStore().getState();
  if (TransactionTypes.TRANSFER_COINS) {
    //TODO: KP TEST once polkadot transaction is up
    await Tx.transferAndWatch(networkFullUrl, seedWords, transactionObj);
  } else {
    throw new Error('Check Transaction Type and try again');
  }
  const {
    transactionState: { transaction },
  } = getStore().getState();

  return transaction;
};
