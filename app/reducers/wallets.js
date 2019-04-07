import {
  UPDATE_WALLET_LIST,
  CHANGE_CURRENT_WALLET,
  SEED_WORDS_HIDE,
  SEED_WORDS_UPDATE,
  FETCH_WALLET_BALANCE,
} from '../constants/wallets';

const initialState = {
  wallets: [], // all wallets
  currentWallet: {
    address: 'hackAAAAAAAAAAA',
  }, // current wallet
  hasWallet: false, // true when atleast one wallet has been created,
  seedWords: undefined,
  walletBalanceArr: [],
  currentWalletBalance: undefined,
};

const wallets = (state = initialState, action) => {
  switch (action.type) {
    case SEED_WORDS_UPDATE:
      return { ...state, seedWords: action.payload };
    case SEED_WORDS_HIDE:
      return { ...state, seedWords: undefined };
    case CHANGE_CURRENT_WALLET:
      return {
        ...state,
        currentWallet: action.payload.wallet,
      };
    case UPDATE_WALLET_LIST:
      return {
        ...state,
        wallets: action.payload,
        hasWallet: action.payload ? action.payload.length > 0 : false,
      };
    case FETCH_WALLET_BALANCE:
      return {
        ...state,
        currentWalletBalance: action.payload,
      };
    default:
      return state;
  }
};

export default wallets;
