/* eslint-disable import/no-extraneous-dependencies */

// Fees Calculation base on
// reference : https://github.com/polkadot-js/apps/blob/def0506e1d240602ef318a2b40de7ccd0afe8ea5/packages/ui-signer/src/Checks/index.tsx

import { compactToU8a } from '@polkadot/util';
import { BN } from 'bn.js';
import { SIGNATURE_SIZE } from '../../lib/constants/transaction';
import { getApi, isConnected } from './api';

export const checkCreationFee = async (toAddress, creationFee) => {
  if (!isConnected()) throw new Error('not connected');
  const api = getApi();
  const [freeBalance, reservedBalance] = await Promise.all([
    api.query.balances.freeBalance(toAddress),
    api.query.balances.reservedBalance(toAddress),
  ]);
  const votingBalance = new BN(freeBalance).add(new BN(reservedBalance));
  const isCreationFee = votingBalance.gt(new BN(0));
  const newCreationFee = isCreationFee ? new BN(0) : creationFee;
  return newCreationFee;
};

export const getAllFees = async address => {
  if (!isConnected()) throw new Error('not connected');
  const api = getApi();
  const [allFees, systemAccountNonce, txnExtrinsic] = await Promise.all([
    api.derive.balances.fees(),
    api.query.system.accountNonce(address),
    api.tx.balances.transfer(address, 1),
  ]);
  const txnLength = SIGNATURE_SIZE + compactToU8a(systemAccountNonce).length + txnExtrinsic.encodedLength;
  const transactionBaseFee = new BN(allFees.transactionBaseFee);
  const transferFee = new BN(allFees.transferFee);
  const bytesFee = new BN(allFees.transactionByteFee).mul(new BN(txnLength));
  const creationFee = new BN(allFees.creationFee);
  return {
    transactionBaseFee,
    transferFee,
    bytesFee,
    creationFee,
  };
};
export const transferFees = async (address, toAddress) => {
  // get all fees
  const {
    transactionBaseFee, transferFee, bytesFee, creationFee
  } = await getAllFees(address);

  // check for creation fee
  const newCreationFee = await checkCreationFee(toAddress, creationFee);

  // total of all fees
  const totalFee = transactionBaseFee
    .add(transferFee)
    .add(bytesFee)
    .add(newCreationFee);

  // return fees object
  const fees = {
    transactionBaseFee: transactionBaseFee.toString(),
    transferFee: transferFee.toString(),
    bytesFee: bytesFee.toString(),
    creationFee: newCreationFee.toString(),
    totalFee: totalFee.toString(),
  };
  return fees;
};
