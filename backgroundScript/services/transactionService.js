/* eslint-disable no-unused-vars */
import * as TransactionTypes from '../../lib/constants/transaction';
import * as FeeService from './feeService';

// TODO : KP :  Implement correct unit  converter function .
// This is just dummy code for converting;
export const convertUnit = (value, currentUnit, convertInto) => '1000000';

export const getTransactionFees = async (txnType, toAddress) => {
  switch (txnType) {
    case TransactionTypes.TRANSFER_COINS: {
      const fees = await FeeService.getTransferFees(toAddress);
      return fees;
    }
    default:
      throw new Error('Wrong Transaction Type');
  }
};

// TODO : KP :  Implement  transaction function .
// This is just dummy code for Transaction;
export const submitTransaction = async transaction => {
  const {
    txnType,
    metadata: {
      from, to, value, dependingontype
    },
    internal: { address },
  } = transaction;

  return transaction;
};
