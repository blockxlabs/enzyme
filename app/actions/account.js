import * as AccountActionTypes from '../constants/account';
import { Account } from '../api';
import { getDummyBalanceObject } from '../utils/helper';

export const updateAccountList = accounts => ({
  type: AccountActionTypes.ADD_ACCOUNT,
  accounts,
});

export const changeSelectedAccount = account => ({
  type: AccountActionTypes.SELECT_ACCOUNT,
  account,
});

export const updateAccountBalance = balances => ({
  type: AccountActionTypes.UPDATE_ACCOUNT_BALANCE,
  balances,
});

export const updateSelectedAccountBalance = balance => ({
  type: AccountActionTypes.UPDATE_SELECTED_ACCOUNT_BALANCE,
  balance,
});

export const updateIsLinkToBlockxLabFaucet = isLinkToFaucet => ({
  type: AccountActionTypes.UPDATE_IS_LINK_TO_BLOCKXLABS_FAUCET,
  isLinkToFaucet,
});

export const fetchAndSetAccounts = async dispatch => {
  const {
    result: { accounts, currentAccount },
  } = await Account.getAccounts();
  dispatch(updateAccountList(accounts));
  dispatch(changeSelectedAccount(currentAccount));
};

export const fetchAndSetBalances = async (dispatch, getState) => {
  const { accounts, account } = getState().accountReducer;
  const addrArray = accounts.map(({ address }) => address);
  const { result: balances } = await Account.getCurrentBalance(addrArray);
  const balObj = balances.find(acc => acc.address === account.address);
  // Link Faucets with No Transaction yet.
  const { network } = getState().networkReducer;
  const isLinkToFaucet = network.faucetUrl && balObj.balance === '0';
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balObj));
  dispatch(updateIsLinkToBlockxLabFaucet(isLinkToFaucet));
};

export const setInitialBalance = async (dispatch, getState) => {
  const accountObj = getState().accountReducer;
  const { balances, balance } = getDummyBalanceObject(accountObj);
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balance));
};
