/* eslint-disable import/no-extraneous-dependencies */

// Fees Calculation base on
// reference : https://github.com/polkadot-js/apps/blob/def0506e1d240602ef318a2b40de7ccd0afe8ea5/packages/ui-signer/src/Checks/index.tsx

import { BN } from 'bn.js';
import { getApi } from './api';

export const checkCreationFee = async (toAddress, creationFee) => {
  try {
    const api = getApi();
    const [freeBalance, reservedBalance] = await Promise.all([
      api.query.balances.freeBalance(toAddress),
      api.query.balances.reservedBalance(toAddress),
    ]);
    const votingBalance = new BN(freeBalance).add(new BN(reservedBalance));
    const isCreationFee = votingBalance.gt(new BN(0));
    const newCreationFee = isCreationFee ? new BN(0) : creationFee;
    return newCreationFee;
  } catch (err) {
    throw new Error('Error in checkCreationFee');
  }
};

export const getAllFees = async transactionLength => {
  try {
    const api = getApi();
    const allFees = await api.derive.balances.fees();
    const transactionBaseFee = new BN(allFees.transactionBaseFee);
    const transferFee = new BN(allFees.transferFee);
    const bytesFee = new BN(allFees.transactionByteFee).mul(new BN(transactionLength));
    const creationFee = new BN(allFees.creationFee);
    return {
      transactionBaseFee,
      transferFee,
      bytesFee,
      creationFee,
    };
  } catch (err) {
    throw new Error('Error in getAllFees');
  }
};
export const transferFees = async (address, toAddress, transactionLength) => {
  try {
    // get all fees
    const {
      transactionBaseFee, transferFee, bytesFee, creationFee
    } = await getAllFees(
      transactionLength,
    );

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
  } catch (err) {
    throw new Error('Error in transferFees');
  }
};
