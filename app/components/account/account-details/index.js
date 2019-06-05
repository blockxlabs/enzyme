import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import ClickToCopyAddress from '../../common/click-to-copy-address';
import './styles.css';

export default class AccountDetails extends Component {
  render() {
    const {
      alias, onCopyAddress, address, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="account-alias" text={alias} />
        <ClickToCopyAddress
          className="account-address clickable-icon"
          onCopyAddress={onCopyAddress}
          address={address}
        />
      </div>
    );
  }
}
