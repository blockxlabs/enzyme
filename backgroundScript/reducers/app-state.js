import { APP_STATE_READY, APP_STATE_SET_HASH_KEY, APP_STATE_ONBOARDED } from '../actions/app-state';

const initialState = {
  isAppReady: false,
  hashKey: undefined,
  isAppOnBoarded: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case APP_STATE_READY:
      return { ...state, isAppReady: action.ready };
    case APP_STATE_ONBOARDED:
      return { ...state, isAppOnBoarded: action.ready };
    case APP_STATE_SET_HASH_KEY:
      return { ...state, hashKey: action.hashKey };
    default:
      return state;
  }
};

export default appState;
