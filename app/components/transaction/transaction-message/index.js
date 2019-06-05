import React, { Component } from 'react';
import './styles.css';
import FontRegular from '../../common/fonts/font-regular';
import FaucetLink from '../faucet-link';

export default class TransactionMessage extends Component {
  render() {
    const { isLinkToFaucet, network, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="transaction-message-text" text="No transactions yet." />
        {isLinkToFaucet ? <FaucetLink network={network} className="faucets-message" /> : null}
      </div>
    );
  }
}
