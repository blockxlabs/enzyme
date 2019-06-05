import * as Fees from '../apis/fees';

export const getTransferFees = async (senderAddress, toAddress) => {
  const fees = await Fees.transferFees(senderAddress, toAddress);
  return fees;
};
