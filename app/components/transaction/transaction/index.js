import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import TransactionItems from '../transaction-items';
import './styles.css';

export default class Transaction extends Component {
  render() {
    const { transactions, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="transactions-header" text="Transactions" />
        <TransactionItems className="transaction-list-container" transactions={transactions} />
      </div>
    );
  }
}
