export const migration4to5 = data => {
  const { accounts, transactions, network } = data;

  const newState = {
    serialVersion: 5,
    accounts,
    transactions,
    network,
  };
  return newState;
};
