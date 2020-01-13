import * as Types from '../constants/dapp';

const initialState = {
  request: {},
  requests: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONNECT_REQUEST_ENABLE_REQUEST:
      return {
        ...state,
        ...{
          request: action.request,
        },
      };
    case Types.DAPP_REQUESTS_SET:
      return {
        ...state,
        ...{
          requests: action.requests,
        },
      };
    default:
      return state;
  }
};

export default reducer;
