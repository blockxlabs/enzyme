import React, { Component } from 'react';
import Avatar from '../common/identicon';
import AccountPanel from '../account/account-panel';
import './styles.css';

export default class Wallet extends Component {
  render() {
    const {
      selectedAccount,
      onCopyAddress,
      accountMenu,
      onAccountMenuOptionsChange,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      ...otherProps
    } = this.props;

    return (
      <div {...otherProps}>
        <Avatar
          className="account-avatar"
          onCopyAddress={onCopyAddress}
          value={selectedAccount.address}
        />
        <AccountPanel
          inputRef={inputRef}
          onAliasChange={onAliasChange}
          onAliasInputKeyPress={onAliasInputKeyPress}
          onAliasInputBlur={onAliasInputBlur}
          selectedAccount={selectedAccount}
          onCopyAddress={onCopyAddress}
          className="account-detail-container"
          accountMenu={accountMenu}
          onAccountMenuOptionsChange={onAccountMenuOptionsChange}
        />
      </div>
    );
  }
}
