import moment from 'moment';
import { shortenAddress } from './address-formatter';
import * as StatusTypes from '../constants/transaction';
import * as ColorTypes from '../../app/constants/colors';

export const createTransactionToastMessage = ({ status, txnHash }) => {
  const message = `Transaction ${
    status === StatusTypes.SUCCESS || status === StatusTypes.DAPP ? 'was successful' : 'failed'
  } with hash ${shortenAddress(txnHash)}`;
  const type = status === StatusTypes.SUCCESS || status === StatusTypes.DAPP ? 'success' : 'error';
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

export const getTransactionAmount = ({ metadata: { transferAmount } }) => `Sent ${transferAmount}`;

export const getTransactionsToDisplay = transactions => {
  const modifiedTransactions = transactions.map(txn => ({
    color: getTransactionStatusPillColor(txn),
    transferAmount: getTransactionAmount(txn),
    ...txn,
  }));
  return modifiedTransactions;
};

export const getTransfersWithMoment = transactions => {
  const modifiedTransactions = transactions.map(txn => {
    const date2 = moment(txn.date);
    let newModifiedTime;
    const date1 = moment(new Date());
    const duration = moment.duration(date1.diff(date2));
    const seconds = Math.round(duration.asSeconds());
    if (seconds >= 1) {
      if (seconds === 1) {
        newModifiedTime = 'few seconds ago';
      } else if (seconds < 60) {
        newModifiedTime = 'few seconds ago';
      } else if (seconds < 3600) {
        const minutes = Math.round(seconds / 60);
        if (minutes === 1) {
          newModifiedTime = 'a minute ago';
        } else {
          newModifiedTime = `${minutes} minutes ago`;
        }
      } else if (seconds < 86400) {
        const hours = Math.round(seconds / 3600);
        if (hours === 1) {
          newModifiedTime = 'an hour ago';
        } else {
          newModifiedTime = `${hours} hours ago`;
        }
      } else if (seconds < 172800) {
        newModifiedTime = 'a day ago';
      } else {
        newModifiedTime = moment(txn.date).format('MMMM DD,YYYY');
      }
    } else {
      newModifiedTime = 'just now';
    }
    return { modifiedDate: newModifiedTime, ...txn };
  });
  return modifiedTransactions;
};

export const copyAccountMessage = () => 'Account address copied to clipboard.';

export const copyDataMessage = () => 'Message copied to clipboard';

export const onCreateAccount = newAlias => `${newAlias} created successfully.`;

export const onRemoveAccount = newAlias => `${newAlias} removed successfully.`;

export const onUpdateCurrentAccount = newAlias => `${newAlias} selected as successfully.`;

export const onRemoveAddress = name => `${name} removed successfully.`;

export const sendErrorMessage = err => {
  switch (err.code) {
    case 400:
      return err.message;
    default:
      return 'Unable to send transaction.';
  }
};
