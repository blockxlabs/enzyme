import { SUCCESS } from '../../lib/constants/api';
import { success } from '../../backgroundScript/services/response-service';

export const promiseTimeout = (ms, promise, defaultObj) => {
  const timeout = new Promise(resolve => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve({ result: defaultObj, ...success });
    }, ms);
  });
  return Promise.race([promise, timeout]);
};

export const balanceObjOnTimeout = addresses => addresses.map(address => ({ address, balance: '0', status: SUCCESS }));

export const getDummyBalanceObject = ({ accounts, account }) => {
  const balances = accounts.map(account => ({
    address: account.address,
    balance: '0',
    balanceFormatted: '0',
  }));
  const balance = {
    address: account.address,
    balance: '0',
    balanceFormatted: '0',
  };
  return { balances, balance };
};
