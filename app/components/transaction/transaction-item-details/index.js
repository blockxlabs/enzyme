import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import TransactionItemStatus from '../transaction-item-status';
import DarkDivider from '../../common/divider/dark-divider';
import './styles.css';

export default class TransactionItemDetails extends Component {
  render() {
    const {
      amount, address, moment, status, color, ...otherProps
    } = this.props;
    return (
      <div className="transfer-item-details" {...otherProps}>
        <FontMedium className="transaction-item-details-amount" text={amount} />
        <TransactionItemStatus
          address={address}
          moment={moment}
          status={status}
          color={color}
          className="transaction-item-status-container"
        />
        <DarkDivider />
      </div>
    );
  }
}
