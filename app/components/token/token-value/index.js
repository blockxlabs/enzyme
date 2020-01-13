import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';
import TokenUSDValue from '../token-usd-value';

export default class TokenValue extends Component {
  render() {
    const {
      token, marketData, amount, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="token" text={token} />
        {marketData && marketData.error ? (
          <FontAwesomeIcon
            title="USD price is not available."
            icon={faExclamationTriangle}
            style={{ color: '#FFFFFF', fontSize: '15px' }}
          />
        ) : (
          <TokenUSDValue className="usd-value" marketData={marketData} amount={amount} />
        )}
      </div>
    );
  }
}
