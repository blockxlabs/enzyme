import { keccak512 } from 'js-sha3';
import zxcvbn from 'zxcvbn';
import * as SignUpActionTypes from './action-types';
import * as APITypes from '../../api';
import * as AppActions from '../../containers/actions';
import { onBoard } from '../../actions/initialize';

const setHashKeySuccess = () => ({
  type: SignUpActionTypes.SET_HASH_KEY_SUCCESS,
});

const updatePasswordMeterScore = score => ({
  type: SignUpActionTypes.UPDATE_PASSWORD_METER_SCORE,
  score,
});

export const signUp = password => async dispatch => {
  dispatch(AppActions.updateAppLoading(true));
  await APITypes.OnBoarding.setHashKey(keccak512(password));
  dispatch(setHashKeySuccess());
  await APITypes.Account.createAccount(undefined, true);
  await dispatch(onBoard());
};

export const setPasswordMeterScore = password => async dispatch => {
  const { score } = zxcvbn(password);
  dispatch(updatePasswordMeterScore(score));
};
