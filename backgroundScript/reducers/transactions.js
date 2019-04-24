import { FETCH_TRANSACTION, FETCH_TRANSACTIONS } from '../actions/transactions';

const initialState = {
  transaction: undefined,
  transactionArr: [],
};
const transactionState = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactionArr: action.payload,
      };
    default:
      return state;
  }
};
export default transactionState;
