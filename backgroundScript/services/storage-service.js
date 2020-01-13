import * as AccountListener from '../listeners/account-listener';
import * as NetworkListener from '../listeners/network-listener';
import * as TransactionListener from '../listeners/transaction-listener';
import * as PermissionListener from '../listeners/permission-listener';
import * as AddressBookListner from '../listeners/address-book-listener';

export const startListener = () => {
  AccountListener.handleChange();
  NetworkListener.handleChange();
  TransactionListener.handleChange();
  PermissionListener.handleChange();
  AddressBookListner.handleChange();
};
