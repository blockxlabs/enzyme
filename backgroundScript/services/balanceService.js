import * as DotWallet from '../apis/dotWallet';
import { getStore } from '../store/storeProvider';
import * as BalanceAction from '../actions/balances';

export const getBalances = async addresses => {
  const { networkFullUrl } = getStore().getState().networkState.currentNetwork;
  const balanceArray = await Promise.all(
    addresses.map(async address => {
      const balance = await DotWallet.getBalance(address, networkFullUrl);
      return balance;
    }),
  );
  await BalanceAction.fetchAccountBalance(balanceArray);
  return balanceArray;
};
