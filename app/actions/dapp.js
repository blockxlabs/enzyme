import * as RequestType from '../../lib/constants/request-types';
import * as AppActions from '../containers/actions';
import * as AccountActions from './account';
import { getTransactions } from '../views/dashboard/actions';
import {
  setNetwork, updateNetworkStatus, getUnits, getDeveloperMode
} from './network';
import * as NavConstants from '../constants/navigation';
import * as dAppActionType from '../constants/dapp';
import { DApp } from '../api';

export const setEnableRequest = request => ({
  type: dAppActionType.CONNECT_REQUEST_ENABLE_REQUEST,
  request,
});

export const setDAppRequests = requests => ({
  type: dAppActionType.DAPP_REQUESTS_SET,
  requests,
});

const openDashboard = () => async dispatch => {
  await dispatch(getDeveloperMode());
  await dispatch(setNetwork);
  dispatch(updateNetworkStatus(false));
  dispatch(AccountActions.setInitialBalance);
  dispatch(AccountActions.fetchAndSetBalances);
  await dispatch(getTransactions);
  dispatch(getUnits());
  dispatch(AppActions.updateIsAppOnBoarded(true));
  dispatch(AppActions.updateAppLoading(false));
  dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
};

export const navigateAndServiceIfDappRequest = () => async dispatch => {
  try {
    const { result: requests } = await DApp.getDAppRequests();
    if (requests) {
      const enableRequest = requests.find(
        req => req.request.requestType === RequestType.ENABLE
          || req.request.requestType === RequestType.CHANGE_ACCOUNT,
      );
      if (enableRequest) {
        dispatch(setEnableRequest(enableRequest));
        dispatch(AppActions.changePage(NavConstants.CONNECT_REQUEST_PAGE));
      } else {
        dispatch(setDAppRequests(requests));
        dispatch(AppActions.changePage(NavConstants.DAPP_REQUESTS_PAGE));
      }
    } else {
      dispatch(openDashboard());
    }
  } catch (e) {
    dispatch(openDashboard());
  }
};
