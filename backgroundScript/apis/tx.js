/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { Keyring } from '@polkadot/keyring';
import { updateTransactionState } from '../services/transactionService';
import * as TransactionStatus from '../../lib/constants/transaction';
import { convertUnit } from '../../lib/services/unitConverter';
import { baseUnit } from '../../lib/constants/units';

export const transferAndWatch = async (networkFullUrl, seedWords, transaction) => {
  const provider = new WsProvider(networkFullUrl);

  const {
    to, value, from, unit
  } = transaction.metadata;
  const fDOT = convertUnit(value, unit.text, baseUnit.text);
  const api = await ApiPromise.create(provider);
  const nonce = await api.query.system.accountNonce(from);

  const keyring = new Keyring();
  const accountPair = keyring.addFromUri(seedWords);
  const signTransaction = await api.tx.balances
    .transfer(to, Number(fDOT))
    .sign(accountPair, { nonce });

  // Fetch Transaction State
  const txnHash = signTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, TransactionStatus.PENDING);

  // eslint-disable-next-line no-unused-vars
  signTransaction.send(async ({ events = [], status }) => {
    if (status.isFinalized) {
      await updateTransactionState(transaction, txnHash, TransactionStatus.SUCCESS);
      if (provider.isConnected()) provider.disconnect();
    }
    if (status.isDropped || status.isInvalid || status.isUsurped) {
      await updateTransactionState(transaction, txnHash, TransactionStatus.FAIL);
      if (provider.isConnected()) provider.disconnect();
    }
  });
};
