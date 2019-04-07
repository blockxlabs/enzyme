import {
  CHANGE_PAGE_STATUS,
  UPDATE_TIMEOUT,
  SEND_TOKEN_STATE,
  NETWORK_CONNECTION_UPDATE,
  ISLOADING,
  APPSTATE_IS_APP_READY,
} from '../constants/common';
import { TERMS_PAGE } from '../constants/navigation';

const initialState = {
  pageStatus: TERMS_PAGE,
  token: undefined,
  isTermsAgree: undefined,
  isUpdatedTouVersion: false,
  timeout: 300000, // in miliseconds, default to 5 mins
  marketData: undefined,
  sendTokenSavedState: {},
  isNetworkConnected: true,
  statusCode: 200,
  isLoading: false,
  isAppReady: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE_STATUS:
      return { ...state, pageStatus: action.payload };
    case UPDATE_TIMEOUT:
      return { ...state, timeout: action.payload };
    case ISLOADING:
      return { ...state, isLoading: action.payload };
    case APPSTATE_IS_APP_READY:
      return { ...state, isAppReady: action.payload };
    case SEND_TOKEN_STATE:
      return { ...state, sendTokenSavedState: action.payload };
    case NETWORK_CONNECTION_UPDATE:
      return {
        ...state,
        isNetworkConnected: action.payload.flag,
        statusCode: action.payload.statusCode,
      };
    default:
      return state;
  }
};

export default appState;
