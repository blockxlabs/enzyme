import * as Types from './action-types';

const initialState = {
  accountOptions: [],
  selectedAccount: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONNECT_REQUEST_ACCOUNT_OPTIONS:
      return {
        ...state,
        ...{
          accountOptions: action.accountOptions,
          selectedAccount: action.selectedAccount,
        },
      };
    case Types.CONNECT_REQUEST_SELECTED_ACCOUNT:
      return {
        ...state,
        ...{
          selectedAccount: action.selectedAccount,
        },
      };
    case Types.CONNECT_REQUEST_TITLE:
      return {
        ...state,
        ...{
          title: action.title,
        },
      };
    default:
      return state;
  }
};

export default reducer;
