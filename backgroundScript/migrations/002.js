export const migration1to2 = data => {
  const {
    accounts, transactions, network, permissions, addressBook
  } = data;

  const newState = {
    serialVersion: 2,
    accounts,
    transactions,
    network,
    permissions,
    addressBook,
  };
  return newState;
};
