import * as Types from '../constants/network';
import { DOT_NETWORK_LIST } from '../../lib/constants/networks';

const initialState = {
  networks: [],
  network: DOT_NETWORK_LIST[0],
  customNetwork: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_NETWORK_LIST:
      return {
        ...state,
        ...{
          networks: action.networks,
        },
      };
    case Types.CHANGE_NETWORK:
      return {
        ...state,
        ...{
          network: action.network,
        },
      };
    case Types.UPDATE_CUSTOM_NETWORK:
      return {
        ...state,
        ...{
          customNetwork: action.customNetwork,
        },
      };
    default:
      return state;
  }
};

export default reducer;
