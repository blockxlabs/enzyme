import * as Types from './actionTypes';
import { updateAppLoading, changePage } from '../../containers/actions';
import { Account } from '../../api';
import { DASHBOARD_PAGE } from '../../constants/navigation';

export const updateAccountList = accounts => ({
  type: Types.ADD_ACCOUNT,
  accounts,
});

export const changeSelectedAccount = account => ({
  type: Types.SELECT_ACCOUNT,
  account,
});

export const updateAccountBalance = balance => ({
  type: Types.UPDATE_ACCOUNT_BALANCE,
  balance,
});

export const createFirstAccountWithSeedPhraseError = error => ({
  type: Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_ERROR,
  error,
});

export const createFirstAccountWithSeedPhraseSuccess = () => ({
  type: Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_SUCCESS,
});

export const createFirstAccountWithSeedPhrase = importedSeedPhrase => async (
  dispatch,
  getState,
) => {
  try {
    let { accounts } = getState().createAccountReducer;
    dispatch(updateAppLoading(true));
    const { result } = await Account.createAccount(importedSeedPhrase, true);
    accounts = [];
    dispatch(updateAccountList([]));
    dispatch(updateAccountList(accounts.push(result)));
    dispatch(createFirstAccountWithSeedPhraseSuccess());
    const { result: account } = await Account.getCurrentAccount();
    dispatch(changeSelectedAccount(account));
    dispatch(changePage(DASHBOARD_PAGE));
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    dispatch(createFirstAccountWithSeedPhraseError(error));
  } finally {
    dispatch(updateAppLoading(false));
  }
};

export const resetImportAccountWithSeedPhraseError = () => dispatch => {
  dispatch(createFirstAccountWithSeedPhraseError(null));
};
