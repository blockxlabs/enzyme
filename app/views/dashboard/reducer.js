import * as Types from './action-types';

const initialState = {
  transactions: [],
  pendingTransfers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          transactions: action.transactions,
        },
      };
    case Types.UPDATE_PENDING_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          pendingTransfers: action.pendingTransfers,
        },
      };
    default:
      return state;
  }
};

export default reducer;
