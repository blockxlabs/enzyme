import React, { Component } from 'react';

//Import common Components
import FontRegular from '../fonts/font-regular';
import FontMedium from '../fonts/font-medium';
import Divider from '../divider/dark-divider';

//Import styles
import './styles.css';

// Import Validation Object and rules
import { convertNumberToFormattedString } from '../../../services/numberFormatter';

// Styles for Fonts
const stylesForMedium = { fontSize: 19, lineHeight: 1 };
const stylesForRegular = { fontSize: 14, lineHeight: 1, color: '#ACACAC' };

export default class ConfirmView extends Component {
  shortenURL(url) {
    if (url.length > 29) {
      return `${url.substring(0, 29)}...`;
    }
    return url;
  }

  render() {
    const {
      fromAlias,
      from,
      toAlias,
      to,
      value,
      symbol,
      ccyValue,
      ccy,
      nrgType,
      nrgPrice,
      nrgLimit,
      hexData,
    } = this.props;
    return (
      <div className="confirm-view-grid-container">
        <div className="confirm-view-from-to">
          <div className="confirm-view-from">
            <FontRegular style={stylesForRegular}>From</FontRegular>
            <FontMedium style={stylesForMedium}>{fromAlias}</FontMedium>

            <FontRegular>{from}</FontRegular>
          </div>

          <div className="confirm-view-to">
            <FontRegular style={stylesForRegular}>To</FontRegular>

            <FontMedium style={stylesForMedium}>{toAlias}</FontMedium>
            <FontRegular>{to}</FontRegular>
          </div>
        </div>
        <Divider className="send-grid-from-to-divider" />
        <div className="confirm-view-amount">
          <FontRegular style={stylesForRegular}>Amount</FontRegular>

          <div className="confirm-view-details">
            <div className="confirm-view-details-value">
              <FontMedium style={stylesForMedium}>
                {`${convertNumberToFormattedString(value)} ${symbol}`}
              </FontMedium>
            </div>
            {ccyValue !== undefined ? (
              <div className="confirm-view-details-value-unit">
                <FontRegular style={stylesForRegular}>
                  {`$${convertNumberToFormattedString(ccyValue)} ${ccy}`}
                </FontRegular>
              </div>
            ) : null}
          </div>
        </div>
        <Divider className="send-grid-amount-divider" />
        <div className="confirm-view-nrg-price">
          <FontRegular style={stylesForRegular}>NRG Price</FontRegular>
          <div className="confirm-view-details">
            <div className="confirm-view-details-value">
              <FontMedium style={stylesForMedium}>{nrgType}</FontMedium>
            </div>
            <div className="confirm-view-details-value-unit">
              <FontRegular style={stylesForRegular}>{`${nrgPrice} Amp`}</FontRegular>
            </div>
          </div>
        </div>
        <Divider className="send-grid-nrg-price-divider" />
        <div className="confirm-view-nrg-limit">
          <FontRegular style={stylesForRegular}>NRG Limit</FontRegular>
          <div className="confirm-view-details">
            <FontMedium style={stylesForMedium}>{nrgLimit}</FontMedium>
          </div>
        </div>
        <Divider className="send-grid-nrg-limit-divider" />
        <div className="confirm-view-hex-data">
          <FontRegular style={stylesForRegular}>Hex data</FontRegular>
          <div className="confirm-view-details">
            <FontMedium style={stylesForMedium}>{hexData}</FontMedium>
          </div>
        </div>
      </div>
    );
  }
}
