import * as Types from './actionTypes';

const initialState = {
  accounts: [],
  success: false,
  error: null,
  account: undefined,
  balances: [],
  balance: '0',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_ACCOUNT:
      return {
        ...state,
        ...{
          accounts: action.accounts,
        },
      };
    case Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_SUCCESS:
      return {
        ...state,
        ...{
          success: true,
        },
      };
    case Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };
    case Types.SELECT_ACCOUNT:
      return {
        ...state,
        ...{
          account: action.account,
        },
      };
    case Types.UPDATE_ACCOUNT_BALANCE:
      return {
        ...state,
        ...{
          balances: action.balances,
        },
      };
    case Types.UPDATE_SELECTED_ACCOUNT_BALANCE:
      return {
        ...state,
        ...{
          balance: action.balance,
        },
      };
    default:
      return state;
  }
};

export default reducer;
