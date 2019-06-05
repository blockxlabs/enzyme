import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import Address from '../../common/address';
import './styles.css';
import ClickToCopyAddress from '../../common/click-to-copy-address';

export default class TransferFromAddress extends Component {
  render() {
    const {
      alias, address, canCopy, onCopyAddress, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="transfer-form-address-alias" text={alias} />
        {canCopy ? (
          <ClickToCopyAddress
            className="transfer-form-address-text clickable-icon"
            onCopyAddress={onCopyAddress}
            address={address}
          />
        ) : (
          <Address className="transfer-form-address-text" hash={address} />
        )}
      </div>
    );
  }
}
