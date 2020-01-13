import * as BalanceAction from '../actions/balances';
import { getWallet } from './wallet-service';
import { BAD_REQUEST } from '../../lib/constants/api';

const validateAddress = addresses => {
  if (addresses === undefined || addresses === [] || addresses === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires addresses.',
    };
  }
};

export const getBalances = async addresses => {
  const vResult = validateAddress(addresses);
  if (vResult !== undefined) return vResult;

  const wallet = getWallet();
  const balanceArray = await Promise.all(
    addresses.map(async address => {
      const balance = await wallet.getBalance(address);
      return balance;
    }),
  );
  await BalanceAction.fetchAccountBalance(balanceArray);
  return balanceArray;
};

export const getBalance = async address => {
  const wallet = getWallet();
  const balance = await wallet.getBalance(address);
  return balance;
};

export const valueFormatter = value => {
  const wallet = getWallet();
  const fBalance = wallet.valueFormatter(value);
  return fBalance;
};
