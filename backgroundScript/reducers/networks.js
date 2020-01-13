import { UPDATE_CURRENT_NETWORK, UPDATE_DEVELOPER_MODE } from '../actions/networks';
import { DEFAULT_NETWORK } from '../../lib/constants/networks';

const initialState = {
  currentNetwork: DEFAULT_NETWORK,
  isDeveloperMode: false,
};

const networkState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_NETWORK:
      return { ...state, currentNetwork: action.payload };
    case UPDATE_DEVELOPER_MODE:
      return {
        ...state,
        isDeveloperMode: action.payload,
      };

    default:
      return state;
  }
};

export default networkState;
