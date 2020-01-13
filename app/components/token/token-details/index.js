import React, { Component } from 'react';
import TokenBalance from '../token-balance';
import TokenDetailFooter from '../token-detail-footer';
import './styles.css';

export default class TokenDetails extends Component {
  render() {
    const {
      balance,
      unit,
      handleDeposit,
      handleSend,
      marketData,
      amount,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TokenBalance
          className="token-balance"
          unit={unit}
          balance={`${balance}`}
          amount={amount}
          marketData={marketData}
        />
        <TokenDetailFooter
          className="token-detail-footer"
          handleDeposit={handleDeposit}
          handleSend={handleSend}
          receiveButtonName="receive"
          sendButtonName="send"
        />
      </div>
    );
  }
}
