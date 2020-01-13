import { getStore } from '../../store/store-provider';

export const getAccountState = () => {
  const { accountState } = getStore().getState();
  return { ...accountState };
};

export const getCurrentAccount = () => {
  const accountState = getAccountState();
  const { currentAccount } = accountState;
  return currentAccount;
};
