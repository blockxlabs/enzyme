import { keccak512 } from 'js-sha3';
import zxcvbn from 'zxcvbn';
import * as SignUpActionTypes from './action-types';
import * as APITypes from '../../api';
import * as AppActions from '../../containers/actions';
import * as AccountActions from '../../actions/account';
import * as NavConstants from '../../constants/navigation';

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
  await dispatch(AccountActions.getSeedWords());
  dispatch(AppActions.changePage(NavConstants.CREATE_ACCOUNT_PAGE));
  dispatch(AppActions.updateAppLoading(false));
};

export const setPasswordMeterScore = password => async dispatch => {
  let { score } = zxcvbn(password);
  if (score === 0 && password.length > 4) {
    score = 1;
  }
  dispatch(updatePasswordMeterScore(score));
};
