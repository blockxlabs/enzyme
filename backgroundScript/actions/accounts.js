export const CHANGE_CURRENT_ACCOUNT = 'ACCOUNT/CHANGE_CURRENT';
export const UPDATE_ACCOUNT_LIST = 'ACCOUNT/UPDATE_LIST';
export const SET_SEED_WORDS = 'ACCOUNT/SET_SEED_WORDS';
export const RESET_SEED_WORDS = 'ACCOUNT/RESET_SEED_WORDS';

export function setSeedWords(seedWords) {
  return {
    type: SET_SEED_WORDS,
    payload: seedWords,
  };
}

export function resetSeedWords() {
  return {
    type: RESET_SEED_WORDS,
    payload: undefined,
  };
}

export function updateAccountList(accounts) {
  return {
    type: UPDATE_ACCOUNT_LIST,
    payload: accounts,
  };
}

export function changeCurrentAccount(account) {
  return {
    type: CHANGE_CURRENT_ACCOUNT,
    payload: { account },
  };
}
