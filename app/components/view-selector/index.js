import React, { Component } from 'react';
import SignIn from '../../views/sign-in';
import SignUp from '../../views/sign-up';
import CreateAccount from '../../views/create-account';
import CreateAddressBook from '../../views/create-address-book';
import Terms from '../../views/terms';
import Dashboard from '../../views/dashboard';
import Transfer from '../../views/transfer';
import Confirm from '../../views/confirm';
import LoaderOverlay from '../loader-overlay';
import Error from '../../views/error';
import CustomNetwork from '../../views/custom-network';
import QRCode from '../../views/qr-code';
import ManageAccount from '../../views/manage-account';
import AddressBook from '../../views/address-book';
import About from '../../views/about';
import ConnectRequest from '../../views/connect-request';
import DAppRequests from '../../views/dapp-requests';
import * as NavConstant from '../../constants/navigation';

const getView = page => {
  switch (page) {
    case NavConstant.TERMS_PAGE:
      return <Terms />;
    case NavConstant.DASHBOARD_PAGE:
      return <Dashboard />;
    case NavConstant.LOADER_OVERLAY:
      return <LoaderOverlay />;
    case NavConstant.SIGN_IN_PAGE:
      return <SignIn />;
    case NavConstant.SIGN_UP_PAGE:
      return <SignUp />;
    case NavConstant.CREATE_ACCOUNT_PAGE:
      return <CreateAccount />;
    case NavConstant.CREATE_ADDRESS_BOOK_PAGE:
      return <CreateAddressBook />;
    case NavConstant.TRANSFER_PAGE:
      return <Transfer />;
    case NavConstant.CONFIRM_PAGE:
      return <Confirm />;
    case NavConstant.ERROR_PAGE:
      return <Error />;
    case NavConstant.CUSTOM_NETWORK_PAGE:
      return <CustomNetwork />;
    case NavConstant.QR_CODE_PAGE:
      return <QRCode />;
    case NavConstant.ABOUT_PAGE:
      return <About />;
    case NavConstant.CONNECT_REQUEST_PAGE:
      return <ConnectRequest />;
    case NavConstant.DAPP_REQUESTS_PAGE:
      return <DAppRequests />;
    case NavConstant.MANAGE_ACCOUNT_PAGE:
      return <ManageAccount />;
    case NavConstant.ADDRESS_BOOK_PAGE:
      return <AddressBook />;
    default:
      return <Dashboard />;
  }
};

export default class ViewSelector extends Component {
  render() {
    const { page, ...otherProps } = this.props;
    return <div {...otherProps}>{getView(page)}</div>;
  }
}
