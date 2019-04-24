import React, { Component } from 'react';
import Avatar from '../common/identicon';
import AccountDetails from '../account/account-details';
import './styles.css';
import { WalletDropDownIcon } from '../common/icon';

export default class Wallet extends Component {
  render() {
    const { selectedAccount, onCopyAddress, ...otherProps } = this.props;

    return (
      <div {...otherProps}>
        <Avatar className="account-avatar" value={selectedAccount.address} />
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
