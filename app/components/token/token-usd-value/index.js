import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';
import { convertNumberToFormattedString } from '../../../../lib/services/numberFormatter';

export default class TokenUSDValue extends Component {
  render() {
    const {
      token, marketData, amount, ...otherProps
    } = this.props;
    let usd = 0;
    if (marketData) {
      const { currentPrice } = marketData;
      usd = Number(currentPrice) * Number(amount && amount);
    }
    return (
      <div {...otherProps}>
        <FontRegular className="usd" text={`$ ${convertNumberToFormattedString(usd)} USD`} />
        <FontAwesomeIcon
          title="Data provided by Coingecko."
          icon={faInfoCircle}
          style={{ color: '#FFFFFF', fontSize: '15px' }}
        />
      </div>
    );
  }
}
