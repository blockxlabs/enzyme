//import dependencies
import React, { Component } from 'react';
import classNames from 'classnames';

//import components
import { IconSendTransaction } from '../common/icon';
import StatusPill from '../common/status-pill';
import { convertNumberToFormattedString } from '../../services/numberFormatter';

//import styles
import './styles.css';

class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '',
    };
    this.viewTransaction = this.viewTransaction.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { status } = nextProps;
    let color;
    let text;
    switch (status) {
      // Transaction fails status:0x0
      case '0x0':
        color = '#CB0000';
        text = 'FAILED';
        break;
      // Transaction successful status:0x1
      case '0x1':
        color = '#00A200';
        text = 'COMPLETED';
        break;
      // Status  unavailable
      default:
        color = '#FFAA00';
        text = 'PENDING';
    }
    return { color, text };
  }

  viewTransaction() {
    const {
      props: { viewTransaction, hash, isClickable },
    } = this;
    if (isClickable) {
      viewTransaction(hash);
    }
  }

  render() {
    const {
      props: {
        value,
        usdValue,
        to,
        selectedToken: { symbol },
        isClickable,
        modifiedTime,
      },
      state: { color, text },
    } = this;
    const transactionItemContainerClassName = classNames({
      'transaction-item-container-pointer': isClickable,
      'transaction-item-container-none': !isClickable,
    });
    return (
      <div className={transactionItemContainerClassName} onClick={this.viewTransaction}>
        <div className="transaction-item-left-icon">
          <IconSendTransaction />
        </div>
        <div className="transaction-item-main">
          <span style={{ fontSize: 19, fontFamily: 'Roboto-Medium' }}>
            {`Sent ${convertNumberToFormattedString(value)}`}
          </span>
          <span style={{ fontSize: 12, fontFamily: 'Roboto-Regular' }}>{` ${symbol}`}</span>
          {usdValue !== undefined && usdValue !== '' ? (
            <span style={{ fontSize: 11, fontFamily: 'Roboto-Regular', opacity: 0.4 }}>
              {` ${convertNumberToFormattedString(usdValue)} USD`}
            </span>
          ) : null}
        </div>
        <div
          className="transaction-item-secondary"
          style={{ fontSize: 11, fontFamily: 'Roboto-Regular' }}
        >
          {`${to} ∙ ${modifiedTime === undefined ? '' : modifiedTime}`}
        </div>
        <div className="transaction-item-right">
          <StatusPill
            text={`${text}`}
            borderColor={`${color}`}
            background={`${color}`}
            textColor="#ffffff"
          />
        </div>
      </div>
    );
  }
}

export default TransactionItem;
