import React, { Component } from 'react';
import ButtonMD from '../common/buttons/button-md';
import { tokenName } from './styles';
import './styles.css';

export default class TokenDetails extends Component {
  render() {
    const { balance } = this.props;
    return (
      <div>
        <div className="token-details-grid-containers">
          <div className="token-details-grid-token-name">
            <p style={tokenName}>DOT</p>
          </div>

          <div className="token-details-token-balance">
            <div className="token-balance-amount">{`${balance}`}</div>

            <p className="token-balance-grid-usd">$0 USD</p>
          </div>

          <div className="token-details-grid-deposit-button">
            <ButtonMD color="primary" onClick={this.handelDeposit}>
              Receive
            </ButtonMD>
          </div>

          <div className="token-details-grid-send-button">
            <ButtonMD color="primary" onClick={this.handelSend}>
              Send
            </ButtonMD>
          </div>
        </div>
      </div>
    );
  }
}
