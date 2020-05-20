/* eslint-disable import/no-extraneous-dependencies */

// Fees Calculation base on
// reference : https://github.com/polkadot-js/apps/blob/def0506e1d240602ef318a2b40de7ccd0afe8ea5/packages/ui-signer/src/Checks/index.tsx

import { BN } from 'bn.js';
import { getApi } from './api';

export const checkCreationFee = async (toAddress, creationFee) => {
  try {
    const api = getApi();
    const allBalances = await api.derive.balances.all([toAddress]);
    return allBalances.votingBalance.isZero() ? creationFee : new BN(0);
  } catch (err) {
    throw new Error('Error in checkCreationFee');
  }
};

// How to estimate transaction fees
// reference:  https://polkadot.js.org/api/cookbook/tx.html#how-do-i-estimate-the-transaction-fees
export const calculatePartialFees = async (sender, recipient, transaction) => {
  try {
    const api = getApi();
    const result = await api.tx.balances.transfer(recipient, transaction).paymentInfo(sender);
    const partialFees = new BN(result.partialFee);
    return partialFees;
  } catch (error) {
    throw new Error('Error in calculatePartialFees');
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

    // calculate partial fees
    const partialFees = await calculatePartialFees(address, toAddress, transactionLength);

    // check for creation fees
    const newCreationFee = await checkCreationFee(toAddress, creationFee);

    // total of all fees
    const totalFee = transactionBaseFee
      .add(transferFee)
      .add(bytesFee)
      .add(newCreationFee)
      .add(partialFees);

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
