import { UPDATE_AUTHORISED_DAPP_LIST } from '../actions/permissions';

const initialState = {
  whiteListedDApps: {},
};

const permissionState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHORISED_DAPP_LIST:
      return { ...state, whiteListedDApps: action.whiteListedDApps };
    default:
      return state;
  }
};

export default permissionState;
