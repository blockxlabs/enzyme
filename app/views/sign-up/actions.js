import { keccak512 } from 'js-sha3';
import zxcvbn from 'zxcvbn';
import * as Types from './actionTypes';
import * as AccountActions from '../create-account/actions';
import * as APITypes from '../../api';
import { CREATE_ACCOUNT_PAGE } from '../../constants/navigation';
import * as AppActions from '../../containers/actions';

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

const updatePasswordMeterScore = score => ({
  type: Types.UPDATE_PASSWORD_METER_SCORE,
  score,
});

export const signUp = password => async dispatch => {
  try {
    dispatch(AppActions.updateAppLoading(true));
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    dispatch(setHashKeySuccess());
    await APITypes.Account.createAccount(undefined, true);
    const { result: seedWords } = await APITypes.Account.getSeedWords();
    dispatch(setOnBoardingSeedWords(seedWords));
    await dispatch(AccountActions.fetchAndSetAccounts);
    await dispatch(AccountActions.fetchAndSetBalances);
    dispatch(AppActions.changePage(CREATE_ACCOUNT_PAGE));
    dispatch(AppActions.updateIsAppOnBoarded(true));
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    dispatch(setOnBoardingError(error));
  } finally {
    dispatch(AppActions.updateAppLoading(false));
  }
};

export const setPasswordMeterScore = password => async dispatch => {
  const { score } = zxcvbn(password);
  dispatch(updatePasswordMeterScore(score));
};
