import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import Address from '../../common/address';
import './styles.css';

export default class TransferFromAddress extends Component {
  render() {
    const { alias, address, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="transfer-form-address-alias" text={alias} />
        <Address className="transfer-form-address-text" hash={address} />
      </div>
    );
  }
}
