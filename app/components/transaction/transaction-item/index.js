import React, { Component } from 'react';
import { IconTransfer } from '../../common/icon';
import TransactionItemDetails from '../transaction-item-details';
import { DAPP } from '../../../../lib/constants/transaction';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const { transaction, ...otherProps } = this.props;
    const {
      internal: {
        network: { transactionUrl },
      },
    } = transaction;
    return (
      <div>
        {transactionUrl && transaction.status !== DAPP ? (
          <a
            href={`${transactionUrl}/${transaction.txnHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div {...otherProps}>
              <IconTransfer className="transfer-item-icon" />
              <TransactionItemDetails
                amount={transaction.transferAmount}
                address={transaction.metadata.to}
                moment={transaction.modifiedDate}
                status={transaction.status}
                color={transaction.color}
              />
            </div>
          </a>
        ) : (
          <div {...otherProps}>
            <IconTransfer className="transfer-item-icon" />
            <TransactionItemDetails
              amount={transaction.transferAmount}
              address={transaction.metadata.to}
              moment={transaction.modifiedDate}
              status={transaction.status}
              color={transaction.color}
            />
          </div>
        )}
      </div>
    );
  }
}
