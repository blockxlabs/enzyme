import * as AccountActions from './account';
import * as NavConstants from '../constants/navigation';
import * as APIConstants from '../../lib/constants/api';
import * as AppActions from '../containers/actions';
import { verifyTermsVersion } from '../views/terms/actions';
import { OnBoarding } from '../api';
import { navigateAndServiceIfDappRequest } from './dapp';

export const onBoard = () => async dispatch => {
  try {
    const { isAgree } = await dispatch(verifyTermsVersion());
    if (!isAgree) {
      dispatch(AppActions.updateAppLoading(false));
      dispatch(AppActions.changePage(NavConstants.TERMS_PAGE));
    } else {
      await dispatch(AccountActions.fetchAndSetAccounts);
      const { result } = await OnBoarding.getIsAppOnBoarded();
      if (Object.prototype.hasOwnProperty.call(result, 'App') && result.App.isAppOnBoarded) {
        dispatch(navigateAndServiceIfDappRequest());
        dispatch(AppActions.updateAppLoading(false));
      } else {
        dispatch(AppActions.updateAppLoading(false));
        dispatch(AppActions.changePage(NavConstants.CREATE_ACCOUNT_PAGE));
      }
    }
  } catch (e) {
    dispatch(AppActions.updateAppLoading(false));
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
