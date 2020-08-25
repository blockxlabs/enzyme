import React, { Component } from 'react';
import Address from '../../common/address';
import StatusPill from '../../common/status-pill';
import './styles.css';

export default class TransactionItemStatus extends Component {
  render() {
    const {
      address, moment, status, color, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {address && (
          <Address
            className="transaction-item-details-status-address"
            hash={address}
            text={`• ${moment}`}
          />
        )}

        <StatusPill text={status} backgroundColor={color} color="rgba(255, 255, 255, 1)" />
      </div>
    );
  }
}
