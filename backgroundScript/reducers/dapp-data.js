import { UPDATE_DAPP_METADATA } from '../actions/dapp-data';

const initialState = {
  metaData: undefined,
};

const dAppDataState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DAPP_METADATA:
      return {
        ...state,
        metaData: action.metaData,
      };
    default:
      return state;
  }
};

export default dAppDataState;
