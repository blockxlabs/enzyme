export const CHANGE_CURRENT_WALLET = 'CHANGE_CURRENT_WALLET';
export const UPDATE_WALLET_LIST = 'UPDATE_WALLET_LIST';
export const FETCH_WALLET_BALANCE = 'FETCH_WALLET_BALANCE';
export const SEED_WORDS_UPDATE = 'SEED_WORDS_UPDATE';
export const SEED_WORDS_HIDE = 'SEED_WORDS_HIDE';

export function seedWordsUpdate(seedWords) {
  return {
    type: SEED_WORDS_UPDATE,
    payload: seedWords,
  };
}

export function seedWordsHide() {
  return {
    type: SEED_WORDS_HIDE,
    payload: undefined,
  };
}

export function updateWalletList(_wallets) {
  return {
    type: UPDATE_WALLET_LIST,
    payload: _wallets,
  };
}

export function changeCurrentWallet(wallet) {
  return {
    type: CHANGE_CURRENT_WALLET,
    payload: { wallet },
  };
}

export function fetchWalletBalance(data) {
  return {
    type: FETCH_WALLET_BALANCE,
    payload: data,
  };
}
