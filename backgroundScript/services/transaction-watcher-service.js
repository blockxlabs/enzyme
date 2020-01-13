/* eslint-disable import/no-extraneous-dependencies */
import { getStore } from '../store/store-provider';
import { signTransaction } from '../apis/tx';
import { updateTransactionState } from './transaction-service';
import * as Transaction from '../../lib/constants/transaction';
import { getCurrentAccount } from './store/account-store';

export const transferAndWatch = async (seedWords, keypairType, transaction) => {
  // Fetch Transaction State
  const signedTransaction = await signTransaction(seedWords, keypairType, transaction);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);

  // eslint-disable-next-line no-unused-vars
  signedTransaction.send(async ({ events = [], status }) => {
    if (status.isFinalized) {
      await updateTransactionState(transaction, txnHash, Transaction.SUCCESS);
    }
    if (status.isDropped || status.isInvalid || status.isUsurped) {
      await updateTransactionState(transaction, txnHash, Transaction.FAIL);
    }
  });
};

export const submitTransaction = async transactionObj => {
  const { seedWords, keypairType } = getCurrentAccount();
  if (Transaction.TRANSFER_COINS === transactionObj.txnType) {
    await transferAndWatch(seedWords, keypairType, transactionObj);
  } else {
    throw new Error('Check Transaction Type and try again');
  }
  const {
    transactionState: { transaction },
  } = getStore().getState();
  return transaction;
};
