import * as Fees from '../apis/fees';

export const getTransferFees = async (senderAddress, toAddress, transactionLength) => {
  const fees = await Fees.transferFees(senderAddress, toAddress, transactionLength);
  return fees;
};
