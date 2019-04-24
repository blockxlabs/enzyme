import * as AccountActions from '../views/create-account/actions';
import * as NavConstants from '../constants/navigation';
import * as APIConstants from '../../lib/constants/api';
import * as AppActions from '../containers/actions';
import * as NetworkActions from './network';
import { getTransactions } from '../views/dashboard/actions';
import { verifyTermsVersion } from '../views/terms/actions';

export const onBoard = () => async dispatch => {
  try {
    dispatch(NetworkActions.setNetwork);
    const { isAgree } = await dispatch(verifyTermsVersion());
    if (!isAgree) {
      dispatch(AppActions.changePage(NavConstants.TERMS_PAGE));
    } else {
      await dispatch(AccountActions.fetchAndSetAccounts);
      await dispatch(AccountActions.fetchAndSetBalances);
      await dispatch(getTransactions);
      dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
      dispatch(AppActions.updateIsAppOnBoarded(true));
    }
  } catch (e) {
    switch (e.code) {
      case APIConstants.UNAUTHORIZED:
        dispatch(AppActions.changePage(NavConstants.SIGN_IN_PAGE));
        break;
      case APIConstants.BAD_REQUEST:
        dispatch(AppActions.changePage(NavConstants.SIGN_UP_PAGE));
        break;
      default:
        dispatch(AppActions.changePage(NavConstants.ERROR_PAGE));
    }
  }
};
