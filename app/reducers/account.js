import * as Types from '../constants/account';

const initialState = {
  accounts: [],
  account: undefined,
  balances: [],
  balance: '0',
  isLinkToFaucet: false,
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
    case Types.UPDATE_IS_LINK_TO_BLOCKXLABS_FAUCET:
      return {
        ...state,
        ...{
          isLinkToFaucet: action.isLinkToFaucet,
        },
      };
    default:
      return state;
  }
};

export default reducer;
