import * as Types from './actionTypes';
import * as AppActions from '../../containers/actions';
import * as NavConstants from '../../constants/navigation';
import { Account } from '../../api';

export const updateAccountList = accounts => ({
  type: Types.ADD_ACCOUNT,
  accounts,
});

export const changeSelectedAccount = account => ({
  type: Types.SELECT_ACCOUNT,
  account,
});

export const updateAccountBalance = balances => ({
  type: Types.UPDATE_ACCOUNT_BALANCE,
  balances,
});

export const updateSelectedAccountBalance = balance => ({
  type: Types.UPDATE_SELECTED_ACCOUNT_BALANCE,
  balance,
});

export const createFirstAccountWithSeedPhraseError = error => ({
  type: Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_ERROR,
  error,
});

export const createFirstAccountWithSeedPhraseSuccess = () => ({
  type: Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_SUCCESS,
});

export const fetchAndSetAccounts = async dispatch => {
  const {
    result: { accounts, currentAccount },
  } = await Account.getAccounts();
  dispatch(updateAccountList(accounts));
  dispatch(changeSelectedAccount(currentAccount));
};

export const fetchAndSetBalances = async (dispatch, getState) => {
  const { accounts, account } = getState().createAccountReducer;
  const addrArray = accounts.map(({ address }) => address);
  const { result: balances } = await Account.getCurrentBalance(addrArray);
  const balObj = balances.find(acc => acc.address === account.address);
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balObj.balance));
};

export const createFirstAccountWithSeedPhrase = importedSeedPhrase => async dispatch => {
  try {
    dispatch(AppActions.updateAppLoading(true));
    await Account.createAccount(importedSeedPhrase, true);
    dispatch(createFirstAccountWithSeedPhraseSuccess());
    await dispatch(fetchAndSetAccounts);
    await dispatch(fetchAndSetBalances);
    dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    dispatch(createFirstAccountWithSeedPhraseError(error));
  } finally {
    dispatch(AppActions.updateAppLoading(false));
  }
};

export const resetImportAccountWithSeedPhraseError = () => dispatch => {
  dispatch(createFirstAccountWithSeedPhraseError(null));
};
