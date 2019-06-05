import React, { Component } from 'react';
import TransferFrom from '../../transfer/transfer-from';
import FooterButton from '../../common/footer-button';
import QR from '../../common/qr';
import './styles.css';

export default class QRCodeForm extends Component {
  render() {
    const {
      account, onClick, onCopyAddress, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom
          address={account.address}
          canCopy
          onCopyAddress={onCopyAddress}
          alias={account.alias}
        />
        <QR
          className="qr-address"
          onCopyAddress={onCopyAddress}
          size={200}
          value={account.address}
        />
        <FooterButton name="done" onClick={onClick} />
      </div>
    );
  }
}
