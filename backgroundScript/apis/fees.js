/* eslint-disable import/no-extraneous-dependencies */

import { compactToU8a } from '@polkadot/util';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { BN } from 'bn.js';
import { SIGNATURE_SIZE } from '../../lib/constants/transaction';

const isCreationFee = async (networkFullUrl, toAddress) => {
  const provider = new WsProvider(networkFullUrl);
  try {
    const api = await ApiPromise.create(provider);
    const [freeBalance, reservedBalance] = await Promise.all([
      api.query.balances.freeBalance(toAddress),
      api.query.balances.reservedBalance(toAddress),
    ]);
    const votingBalance = new BN(freeBalance).add(new BN(reservedBalance));
    const result = votingBalance.gt(new BN(0));
    return result;
  } finally {
    if (provider.isConnected()) provider.disconnect();
  }
};

export const transferFees = async (networkFullUrl, address, toAddress) => {
  const provider = new WsProvider(networkFullUrl);
  try {
    // reference : https://github.com/polkadot-js/apps/blob/def0506e1d240602ef318a2b40de7ccd0afe8ea5/packages/ui-signer/src/Checks/index.tsx
    const api = await ApiPromise.create(provider);
    const [allFees, systemAccountNonce, txnExtrinsic] = await Promise.all([
      api.derive.balances.fees(),
      api.query.system.accountNonce(address),
      api.tx.balances.transfer(address, 1),
    ]);
    const txnLength = SIGNATURE_SIZE + compactToU8a(systemAccountNonce).length + txnExtrinsic.encodedLength;
    const transactionBaseFee = new BN(allFees.transactionBaseFee);
    const transferFee = new BN(allFees.transferFee);
    const bytesFee = new BN(allFees.transactionByteFee).muln(txnLength);

    const creationFee = (await isCreationFee(networkFullUrl, toAddress))
      ? new BN(0)
      : new BN(allFees.creationFee);
    const fees = transactionBaseFee
      .add(transferFee)
      .add(bytesFee)
      .add(creationFee);
    return fees.toString();
  } finally {
    if (provider.isConnected()) provider.disconnect();
  }
};
