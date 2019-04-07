import {
  SHOW_SETTINGS,
  TOGGLE_WALLET_DROPDOWN,
  TOGGLE_TOKEN_MARKET_DATA,
} from '../constants/animation';

const initialState = {
  showSettings: false,
  showWalletDropdown: false,
  showWalletSettings: false,
  showTokenMarketData: false,
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SETTINGS:
      return { ...state, showSettings: action.payload };
    case TOGGLE_WALLET_DROPDOWN:
      return { ...state, showWalletDropdown: action.payload };
    case TOGGLE_TOKEN_MARKET_DATA:
      return { ...state, showTokenMarketData: action.payload };
    default:
      return state;
  }
};

export default animationReducer;
