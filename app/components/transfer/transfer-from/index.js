import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import TransferFromAddress from '../transfer-from-address';
import './styles.css';

export default class TransferFrom extends Component {
  render() {
    const {
      address, alias, theme, canCopy, onCopyAddress, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: '26px',
          paddingRight: '14px',
          paddingTop: '21.27px',
        }}
        {...otherProps}
      >
        <Avatar
          className="transfer-form-identicon"
          onCopyAddress={onCopyAddress}
          value={address}
          size={44}
          theme={theme}
        />
        <TransferFromAddress
          canCopy={canCopy}
          onCopyAddress={onCopyAddress}
          className="transfer-from-address"
          alias={alias}
          address={address}
        />
      </div>
    );
  }
}
