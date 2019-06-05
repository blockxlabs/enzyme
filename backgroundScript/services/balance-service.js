import * as DotWallet from '../apis/dot-wallet';
import * as BalanceAction from '../actions/balances';

export const getBalances = async addresses => {
  const balanceArray = await Promise.all(
    addresses.map(async address => {
      const balance = await DotWallet.getBalance(address);
      return balance;
    }),
  );
  await BalanceAction.fetchAccountBalance(balanceArray);
  return balanceArray;
};
