import * as Types from '../constants/network';
import { ALEXANDER_NETWORK } from '../../lib/constants/networks';

const initialState = {
  networks: [],
  network: ALEXANDER_NETWORK,
  customNetwork: {},
  isConnected: true,
  customNetworkSuccess: false,
  customNetworkError: {
    customNetworkIsValid: true,
    customNetworkErrorMessage: null,
  },
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
    case Types.UPDATE_NETWORK_STATUS:
      return {
        ...state,
        ...{
          isConnected: action.isConnected,
        },
      };
    case Types.CUSTOM_NETWORK_VALIDATION_ERROR:
      if (action.customNetworkError) {
        return {
          ...state,
          ...{
            customNetworkError: action.customNetworkError,
          },
        };
      }
      return {
        ...state,
        ...{
          customNetworkError: {
            customNetworkIsValid: true,
            customNetworkErrorMessage: null,
          },
        },
      };
    case Types.CUSTOM_NETWORK_VALIDATION_SUCCESS:
      return {
        ...state,
        ...{
          customNetworkSuccess: action.customNetworkSuccess,
        },
      };
    default:
      return state;
  }
};

export default reducer;
