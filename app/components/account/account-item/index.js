import React, { Component } from 'react';
import classNames from 'classnames';
import BalanceDetails from '../balance-details';
import './styles.css';
import AccountDetails from '../account-details';
import Avatar from '../../common/identicon';

export default class AccountItem extends Component {
  render() {
    const {
      account,
      balance,
      onCopyAddress,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      ...otherProps
    } = this.props;
    const accountItemClassNames = classNames({
      'account-item-container': true,
      'clickable-icon': true,
    });
    return (
      <div className={accountItemClassNames} {...otherProps}>
        <Avatar className="account-avatar" onCopyAddress={onCopyAddress} value={account.address} />
        <AccountDetails
          className="account-item-identity-container"
          alias={account.alias}
          inputRef={inputRef}
          address={account.address}
          editMode={account.editMode ? account.editMode : false}
          onAliasChange={event => {
            onAliasChange(event.target.value, account);
          }}
          onAliasInputKeyPress={event => {
            onAliasInputKeyPress(event, account);
          }}
          aliasValue={account.editAlias !== undefined ? account.editAlias : account.alias}
          onAliasInputBlur={() => {
            onAliasInputBlur(account);
          }}
          blockchain={account.blockchain}
          onCopyAddress={onCopyAddress}
        />
        <BalanceDetails
          className="account-item-balance-section"
          balance={balance && balance.balanceFormatted}
          token={balance && balance.token}
        />
      </div>
    );
  }
}
