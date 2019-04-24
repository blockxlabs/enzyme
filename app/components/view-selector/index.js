import React, { Component } from 'react';
import SignIn from '../../views/sign-in';
import SignUp from '../../views/sign-up';
import CreateAccount from '../../views/create-account';
import Terms from '../../views/terms';
import Dashboard from '../../views/dashboard';
import Transfer from '../../views/transfer';
import Confirm from '../../views/confirm';
import LoaderOverlay from '../loader-overlay';
import Error from '../../views/error';
import CustomNetwork from '../../views/custom-network';
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
    case NavConstant.TRANSFER_PAGE:
      return <Transfer />;
    case NavConstant.CONFIRM_PAGE:
      return <Confirm />;
    case NavConstant.ERROR_PAGE:
      return <Error />;
    case NavConstant.CUSTOM_NETWORK_PAGE:
      return <CustomNetwork />;
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
