import { APP_STATE_READY, APP_STATE_SET_HASH_KEY } from '../actions/appState';

const initialState = {
  isAppReady: true,
  hashKey: undefined,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case APP_STATE_READY:
      return { ...state, ready: action.ready };
    case APP_STATE_SET_HASH_KEY:
      return { ...state, hashKey: action.hashKey };
    default:
      return state;
  }
};

export default appState;
