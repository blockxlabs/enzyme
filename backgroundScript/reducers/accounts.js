import {
  UPDATE_ACCOUNT_LIST,
  CHANGE_CURRENT_ACCOUNT,
  RESET_SEED_WORDS,
  SET_SEED_WORDS,
} from '../actions/accounts';

const initialState = {
  accounts: [], // all accounts
  currentAccount: undefined,
  seedWords: undefined,
  hasAccount: false,
};

const accountState = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEED_WORDS:
      return { ...state, seedWords: action.payload };
    case RESET_SEED_WORDS:
      return { ...state, seedWords: undefined };
    case CHANGE_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: action.payload.account,
      };
    case UPDATE_ACCOUNT_LIST:
      return {
        ...state,
        accounts: action.payload,
        hasAccount: action.payload ? action.payload.length > 0 : true,
      };
    default:
      return state;
  }
};

export default accountState;
