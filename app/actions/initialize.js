import { Account } from '../api';
import * as AccountActions from '../views/create-account/actions';
import * as NavConstants from '../constants/navigation';
import * as APIConstants from '../../lib/constants/api';
import * as AppActions from '../containers/actions';
import { updateTimeout } from '../constants/common';

export const onBoard = () => async (dispatch, getState) => {
  try {
    dispatch(AppActions.updateAppLoading(true));
    const { isAgree } = getState().termsReducer;
    dispatch(AppActions.updateIsAppOnBoarded(true));
    if (!isAgree) {
      dispatch(AppActions.changePage(NavConstants.TERMS_PAGE));
    } else {
      const { result } = await Account.getAccounts();
      const { result: balances } = await Account.getCurrentBalance(
        result.accounts.map(({ address }) => address),
      );
      dispatch(AccountActions.updateAccountList(result.accounts));
      dispatch(AccountActions.changeSelectedAccount(result.currentAccount));
      dispatch(AccountActions.updateAccountBalance(balances));
      dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
    }
  } catch (e) {
    switch (e.code) {
      case APIConstants.UNAUTHORIZED:
        dispatch(AppActions.changePage(NavConstants.SIGN_IN_PAGE));
        break;
      default:
        dispatch(AppActions.changePage(NavConstants.SIGN_UP_PAGE));
    }
  } finally {
    dispatch(AppActions.updateAppLoading(false));
  }
};

export function setTimeout(sessionTimeoutStr) {
  return async dispatch => {
    let sessionTimeout = parseInt(sessionTimeoutStr, 10);

    if (sessionTimeout <= 30 && sessionTimeout > 0) {
      sessionTimeout = 30;
    }
    if (sessionTimeout <= 0 || sessionTimeout > 99999999) {
      // once user enter 0 or negative we set session for unlimited time
      //  this is maximum limit supported by react-idle library which we use
      //  to set  session timeout unlimited is approx 3 years.
      sessionTimeout = 99999999;
    }
    //convert into miliseconds
    sessionTimeout *= 1000;
    dispatch(updateTimeout(sessionTimeout));
  };
}
