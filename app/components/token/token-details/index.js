import React, { Component } from 'react';
import TokenBalance from '../token-balance';
import TokenDetailFooter from '../token-detail-footer';
import './styles.css';

export default class TokenDetails extends Component {
  render() {
    const {
      balance, handleDeposit, handleSend, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TokenBalance
          className="token-balance"
          unit="dot"
          balance={`${balance}`}
          balanceUSD="$0 USD"
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
