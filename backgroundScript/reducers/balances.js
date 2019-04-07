import { FETCH_ACCOUNT_BALANCE } from '../actions/balances';

const initialState = {
  accountBalanceArr: [],
};
const balanceState = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalanceArr: action.payload,
      };
    default:
      return state;
  }
};
export default balanceState;
