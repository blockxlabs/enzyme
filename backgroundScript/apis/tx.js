/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { Keyring } from '@polkadot/keyring';
import { BN } from 'bn.js';
import { getApi, isConnected } from './api';
import { updateTransactionState } from '../services/transaction-service';
import * as TransactionStatus from '../../lib/constants/transaction';

export const transferAndWatch = async (seedWords, keypairType, transaction) => {
  const {
    to,
    fAmount,
    account: { address },
  } = transaction.metadata;
  if (!isConnected()) throw new Error('not connected, transferAndWatch ');
  const api = getApi();
  const nonce = await api.query.system.accountNonce(address);
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);
  const signTransaction = await api.tx.balances
    .transfer(to, new BN(fAmount))
    .sign(accountPair, { nonce });

  // Fetch Transaction State
  const txnHash = signTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, TransactionStatus.PENDING);

  // eslint-disable-next-line no-unused-vars
  signTransaction.send(async ({ events = [], status }) => {
    if (status.isFinalized) {
      await updateTransactionState(transaction, txnHash, TransactionStatus.SUCCESS);
    }
    if (status.isDropped || status.isInvalid || status.isUsurped) {
      await updateTransactionState(transaction, txnHash, TransactionStatus.FAIL);
    }
  });
};
