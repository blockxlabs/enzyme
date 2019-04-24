import moment from 'moment';
import { shortenAddress } from './walletService';
import * as StatusTypes from '../../lib/constants/transaction';
import * as ColorTypes from '../constants/colors';

export const createTransactionToastMessage = ({ status, txnHash }) => {
  const message = `Transaction is ${
    status === StatusTypes.SUCCESS ? 'success' : 'failed'
  } with hash ${shortenAddress(txnHash)}`;
  const type = status === StatusTypes.SUCCESS ? 'success' : 'error';
  return { message, type };
};

export const getTransactionStatusPillColor = ({ status }) => {
  switch (status) {
    case StatusTypes.FAIL:
      return ColorTypes.FAIL;
    case StatusTypes.SUCCESS:
      return ColorTypes.SUCCESS;
    case StatusTypes.PENDING:
    default:
      return ColorTypes.PENDING;
  }
};

export const getTransactionAmount = ({ metadata: { value, unit } }) => `Sent ${value} ${unit.value !== '-' ? unit.value : ''}DOT`;

export const getTransactionsToDisplay = transactions => {
  const modifiedTransactions = transactions.map(txn => ({
    color: getTransactionStatusPillColor(txn),
    amount: getTransactionAmount(txn),
    ...txn,
  }));
  return modifiedTransactions;
};

export const getTransfersWithMoment = transactions => {
  const modifiedTransactions = transactions.map(txn => {
    const date2 = moment(txn.date);
    let modifiedTime;
    const date1 = moment(new Date());
    const duration = moment.duration(date1.diff(date2));
    const seconds = Math.round(duration.asSeconds());
    if (seconds >= 1) {
      if (seconds === 1) {
        modifiedTime = 'few seconds ago';
      } else if (seconds < 60) {
        modifiedTime = 'few seconds ago';
      } else if (seconds < 3600) {
        const minutes = Math.round(seconds / 60);
        if (minutes === 1) {
          modifiedTime = 'a minute ago';
        } else {
          modifiedTime = `${minutes} minutes ago`;
        }
      } else if (seconds < 86400) {
        const hours = Math.round(seconds / 3600);
        if (hours === 1) {
          modifiedTime = 'an hour ago';
        } else {
          modifiedTime = `${hours} hours ago`;
        }
      } else if (seconds < 172800) {
        modifiedTime = 'a day ago';
      } else {
        modifiedTime = moment(txn.date).format('MMMM DD,YYYY');
      }
    } else {
      modifiedTime = 'just now';
    }
    txn.modifiedDate = modifiedTime;
    return txn;
  });
  return modifiedTransactions;
};

export const copyAccountMessage = () => 'Account address copied to clipboard.';
