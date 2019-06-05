import React, { Component } from 'react';
import AccountDetails from '../account-details';
import { WalletDropDownIcon } from '../../common/icon';

export default class AccountPanel extends Component {
  render() {
    const { selectedAccount, onCopyAddress, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <AccountDetails
          className="account-detail"
          address={selectedAccount.address}
          alias={selectedAccount.alias}
          onCopyAddress={onCopyAddress}
        />
        <WalletDropDownIcon className="account-list-icon" />
      </div>
    );
  }
}
