import { keccak512 } from 'js-sha3';
import * as Types from './actionTypes';
import { updateAppLoading, changePage } from '../../containers/actions';
import * as AccountActions from '../create-account/actions';
import { CREATE_ACCOUNT_PAGE } from '../../constants/navigation';
import * as APITypes from '../../api';

const setHashKeySuccess = () => ({
  type: Types.SET_HASH_KEY_SUCCESS,
});

const setOnBoardingError = error => ({
  type: Types.SET_ONBOARDING_ERROR,
  error,
});

const setOnBoardingSeedWords = seedWords => ({
  type: Types.SET_SEED_WORDS,
  seedWords,
});

export const signUp = password => async (dispatch, getState) => {
  dispatch(updateAppLoading(true));
  try {
    const { accounts } = getState().createAccountReducer;
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    dispatch(setHashKeySuccess());
    const { result } = await APITypes.Account.createAccount(undefined, true);
    const { result: seedWords } = await APITypes.Account.getSeedWords();
    dispatch(setOnBoardingSeedWords(seedWords));
    dispatch(AccountActions.updateAccountList(accounts.push(result)));
    const { result: account } = await APITypes.Account.getCurrentAccount();
    dispatch(AccountActions.changeSelectedAccount(account));
    dispatch(changePage(CREATE_ACCOUNT_PAGE));
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    dispatch(setOnBoardingError(error));
  } finally {
    dispatch(updateAppLoading(false));
  }
};
