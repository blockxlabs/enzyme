export const FETCH_TRANSACTION = 'TX/FETCH_TRANSACTION';
export const FETCH_TRANSACTIONS = 'TX/FETCH_TRANSACTIONS';

export function fetchTransaction(transaction) {
  return {
    type: FETCH_TRANSACTION,
    payload: transaction,
  };
}

export function fetchTransactions(transactions) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: transactions,
  };
}
