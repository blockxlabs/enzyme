//just update state object

export const migration2to3 = data => {
  const { accounts, transactions, network } = data;

  const newState = {
    serialVersion: 3,
    accounts,
    transactions,
    network,
  };
  return newState;
};
