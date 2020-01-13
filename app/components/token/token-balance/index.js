import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import TokenValue from '../token-value';
import './styles.css';

export default class TokenBalance extends Component {
  render() {
    const {
      unit, balance, marketData, amount, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="token-balance-unit" text={unit} />
        <TokenValue
          className="token-value"
          token={balance}
          marketData={marketData}
          amount={amount}
        />
      </div>
    );
  }
}
