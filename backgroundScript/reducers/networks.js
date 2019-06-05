import { UPDATE_CURRENT_NETWORK } from '../actions/networks';
import { ALEXANDER_NETWORK } from '../../lib/constants/networks';

const initialState = {
  currentNetwork: ALEXANDER_NETWORK,
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
