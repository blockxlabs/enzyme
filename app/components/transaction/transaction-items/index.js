import React, { Component } from 'react';
import TransactionItem from '../transaction-item';
import './styles.css';

export default class TransactionItems extends Component {
  render() {
    const { transactions, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {transactions.map(transaction => (
          <div key={transaction.date}>
            <TransactionItem className="transaction-item" transaction={transaction} />
          </div>
        ))}
      </div>
    );
  }
}
