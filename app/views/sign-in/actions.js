import { keccak512 } from 'js-sha3';
import * as APITypes from '../../api';
import * as Types from './actionTypes';
import * as AppActions from '../../containers/actions';
import * as AccountActions from '../create-account/actions';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import * as APIConstants from '../../../lib/constants/api';
import { getTransactions } from '../dashboard/actions';

const unlockEnzymeSuccess = () => ({
  type: Types.UNLOCK_ENZYME_SUCCESS,
});

const unlockEnzymeError = error => ({
  type: Types.UNLOCK_ENZYME_ERROR,
  error,
});

export const unlockEnzyme = password => async dispatch => {
  dispatch(AppActions.updateAppLoading(true));
  try {
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    await dispatch(AccountActions.fetchAndSetAccounts);
    await dispatch(AccountActions.fetchAndSetBalances);
    dispatch(unlockEnzymeSuccess());
    dispatch(getTransactions);
    dispatch(AppActions.changePage(DASHBOARD_PAGE));
    dispatch(AppActions.updateIsAppOnBoarded(true));
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    switch (e.code) {
      case APIConstants.UNAUTHORIZED:
        error.message = password !== '' ? 'Password is incorrect.' : 'Password is required.';
        break;
      default:
    }
    dispatch(unlockEnzymeError(error));
  } finally {
    dispatch(AppActions.updateAppLoading(false));
  }
};
