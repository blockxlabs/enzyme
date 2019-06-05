import React, { Component } from 'react';
import Avatar from '../common/identicon';
import AccountPanel from '../account/account-panel';
import './styles.css';

export default class Wallet extends Component {
  render() {
    const { selectedAccount, onCopyAddress, ...otherProps } = this.props;

    return (
      <div {...otherProps}>
        <Avatar
          className="account-avatar"
          onCopyAddress={onCopyAddress}
          value={selectedAccount.address}
        />
        <AccountPanel
          selectedAccount={selectedAccount}
          onCopyAddress={onCopyAddress}
          className="account-detail-container"
        />
      </div>
    );
  }
}
