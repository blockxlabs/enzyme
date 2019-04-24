import { ENZYME_UPDATE_TIME } from '../../lib/constants/update';
import { Transaction, Account } from '../api';
import { SUCCESS, FAIL } from '../../lib/constants/transaction';
import { getTransactions, updateTransactions } from '../views/dashboard/actions';
import * as AccountActions from '../views/create-account/actions';
import { getTransfersWithMoment } from './static-message-factory-service';

export function verifyConnection() {
  throw new Error('verifyconnection not implemented');
}

export function checkConnectivity() {
  throw new Error('checkConnectivity not implemented');
}

export async function pollPendingTransactions(store) {
  const { pendingTransfers } = store.getState().dashboardReducer;

  if (pendingTransfers.length > 0) {
    const txResponsePromises = pendingTransfers.map(async tx => {
      const { result: txResponse } = await Transaction.getTransaction(
        tx.internal.network,
        tx.internal.address,
        tx.txnHash,
      );
      return txResponse;
    });
    const res = await Promise.all(txResponsePromises);
    const polledTransfers = res.filter(tx => tx.status === SUCCESS || tx.status === FAIL);

    if (polledTransfers.length > 0) {
      store.dispatch(getTransactions);
    }
  }
}

export async function updateBalance(store) {
  const { accounts, account } = store.getState().createAccountReducer;
  const addrArray = accounts.map(({ address }) => address);
  const { result: balances } = await Account.getCurrentBalance(addrArray);
  const balObj = balances.find(acc => acc.address === account.address);
  store.dispatch(AccountActions.updateAccountBalance(balances));
  store.dispatch(AccountActions.updateSelectedAccountBalance(balObj.balance));
}

export async function updateTransactionItemTime(store) {
  const { transactions } = store.getState().dashboardReducer;
  const transfersWithModifiedTime = getTransfersWithMoment(transactions);
  store.dispatch(updateTransactions(transfersWithModifiedTime));
}

export function updateApplicationState(store) {
  setInterval(async () => {
    const { isOnBoarded } = store.getState().appStateReducer;
    if (isOnBoarded) {
      try {
        pollPendingTransactions(store);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error in polling transactions from interval', e);
      }
      try {
        updateBalance(store);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error in updating balance from interval', e);
      }
      try {
        updateTransactionItemTime(store);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error in updating  time for the transaction item time');
      }
    }
  }, ENZYME_UPDATE_TIME);
}
