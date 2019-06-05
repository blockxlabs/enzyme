import * as TransactionTypes from '../../lib/constants/transaction';
import { getStore } from '../store/store-provider';
import * as Tx from '../apis/tx';

export const submitTransaction = async transactionObj => {
  const {
    accountState: {
      currentAccount: { seedWords, keypairType },
    },
  } = getStore().getState();
  if (TransactionTypes.TRANSFER_COINS === transactionObj.txnType) {
    //TODO: KP TEST once polkadot transaction is up
    await Tx.transferAndWatch(seedWords, keypairType, transactionObj);
  } else {
    throw new Error('Check Transaction Type and try again');
  }
  const {
    transactionState: { transaction },
  } = getStore().getState();
  return transaction;
};
