export const migration3to4 = data => {
  const { accounts, transactions, network } = data;

  const newState = {
    serialVersion: 4,
    accounts,
    transactions,
    network,
  };
  return newState;
};
