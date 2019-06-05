export const migration1to2 = data => {
  const { accounts, transactions, network } = data;

  const newState = {
    serialVersion: 2,
    accounts,
    transactions,
    network,
  };
  return newState;
};
