import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import AccountDetails from '../../account/account-details';
import { CaretRight } from '../../common/icon';
import './styles.css';

export default class SendToFrom extends Component {
  render() {
    const {
      toAccount, fromAccount, onCopyAddress, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Avatar
          className="account-avatar"
          onCopyAddress={onCopyAddress}
          value={fromAccount.address}
          size="32"
        />
        <AccountDetails
          className="account-item-identity-container"
          alias={fromAccount.name}
          address={fromAccount.address}
          onCopyAddress={onCopyAddress}
          fontSize="18px"
        />
        {toAccount && (
          <div>
            <CaretRight />
            <Avatar
              className="account-avatar"
              onCopyAddress={onCopyAddress}
              value={toAccount.address}
              size="32"
            />
            <AccountDetails
              className="account-item-identity-container"
              alias={toAccount.alias}
              address={toAccount.address}
              onCopyAddress={onCopyAddress}
              fontSize="18px"
            />
          </div>
        )}
      </div>
    );
  }
}
