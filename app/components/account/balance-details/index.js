import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class BalanceDetails extends Component {
  render() {
    const { balance, token, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="balance-details-balance-text" text={balance} />
        <FontRegular className="balance-details-token-name" text={token} />
      </div>
    );
  }
}
