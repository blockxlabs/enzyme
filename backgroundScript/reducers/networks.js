import { UPDATE_CURRENT_NETWORK } from '../actions/networks';
import { DOT_NETWORK_LIST } from '../../lib/constants/networks';

const initialState = {
  currentNetwork: DOT_NETWORK_LIST[0],
};

const networkState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_NETWORK:
      return { ...state, currentNetwork: action.payload };
    default:
      return state;
  }
};

export default networkState;
