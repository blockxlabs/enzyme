import * as ConnectRequestActionTypes from './action-types';
import * as RequestType from '../../../lib/constants/request-types';
import { DApp } from '../../api';
import { onBoard } from '../../actions/initialize';
import { setNetwork } from '../../actions/network';

const dispatchUpdateSelectedAccount = selectedAccount => ({
  type: ConnectRequestActionTypes.CONNECT_REQUEST_SELECTED_ACCOUNT,
  selectedAccount,
});

const updateTitle = title => ({
  type: ConnectRequestActionTypes.CONNECT_REQUEST_TITLE,
  title,
});

export const initializeRequest = () => async (dispatch, getState) => {
  const {
    request: {
      request: { requestType },
    },
  } = getState().dAppReducer;
  let title;
  switch (requestType) {
    case RequestType.ENABLE:
      title = 'Connect Request';
      break;
    default:
      throw new Error('Request type not valid.');
  }
  dispatch(updateTitle(title));
};

export const allowAccountAuthorization = () => async (dispatch, getState) => {
  const { request } = getState().dAppReducer;
  await DApp.updateWhiteListedDApps(request);
  dispatch(onBoard());
};

export const denyAccountAuthorization = () => async (dispatch, getState) => {
  const { request } = getState().dAppReducer;
  await DApp.cancelRequest(request);
  dispatch(onBoard());
};

export const updateSelectedAccount = address => (dispatch, getState) => {
  const selectedAccount = getState().connectRequestReducer.accountOptions.find(
    account => account.address === address,
  );
  dispatch(dispatchUpdateSelectedAccount(selectedAccount));
};

export const fetchNetwork = () => async dispatch => {
  await dispatch(setNetwork);
};
