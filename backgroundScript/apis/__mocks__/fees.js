import BN from 'bn.js';

const fees = jest.genMockFromModule('./fees.js');

const checkCreationFee = async (toAddress, creationFee) => {
  // returning mock fees.
  if (toAddress !== undefined && creationFee !== undefined) {
    return creationFee;
  }
};
const getAllFees = async address => {
  if (address !== undefined) {
    const allFees = {
      transactionBaseFee: new BN('1000000000000'),
      transferFee: new BN('1000000000000'),
      bytesFee: new BN('1370000000000'),
      creationFee: new BN('1000000000000'),
    };
    return allFees;
  }
};

fees.transferFees = async (address, toAddress) => {
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

export default fees;
