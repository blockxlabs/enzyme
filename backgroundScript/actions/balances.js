export const FETCH_ACCOUNT_BALANCE = 'ACCOUNTS/FETCH_BALANCE';

export function fetchAccountBalance(balances) {
  return {
    type: FETCH_ACCOUNT_BALANCE,
    payload: balances,
  };
}
