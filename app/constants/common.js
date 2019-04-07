export const CHANGE_PAGE_STATUS = 'CHANGE_PAGE_STATUS';
export const UPDATE_TIMEOUT = 'UPDATE_TIMEOUT';
export const SEND_TOKEN_STATE = 'SEND_TOKEN_STATE';
export const NETWORK_CONNECTION_UPDATE = 'NETWORK_CONNECTION_UPDATE';
export const ISLOADING = 'ISLOADING';
export const APPSTATE_IS_APP_READY = 'APPSTATE/IS_APP_READY';

export function dispatchAppStateIsAppReady(isReady) {
  return {
    type: APPSTATE_IS_APP_READY,
    payload: isReady,
  };
}

export function changePageStatus(_newPage) {
  return {
    type: CHANGE_PAGE_STATUS,
    payload: _newPage,
  };
}

export function updateTimeout(_period) {
  return {
    type: UPDATE_TIMEOUT,
    payload: _period,
  };
}

export function saveSendTokenState(data) {
  return {
    type: SEND_TOKEN_STATE,
    payload: data,
  };
}

export function updateNetworkConnection(connection) {
  return {
    type: NETWORK_CONNECTION_UPDATE,
    payload: connection,
  };
}

export function updateLoading(flag) {
  return {
    type: ISLOADING,
    payload: flag,
  };
}
