import React, { Component } from 'react';
import { IconTransfer } from '../../common/icon';
import TransactionItemDetails from '../transaction-item-details';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const { transaction, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <IconTransfer className="transfer-item-icon" />
        <TransactionItemDetails
          amount={transaction.amount}
          address={transaction.metadata.to}
          moment={transaction.modifiedDate}
          status={transaction.status}
          color={transaction.color}
        />
      </div>
    );
  }
}
