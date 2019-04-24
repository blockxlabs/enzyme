import React, { Component } from 'react';
import DarkDivider from '../../common/divider/dark-divider';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import ConfirmFromTo from '../confirm-from-to';
import './styles.css';

export default class ConfirmForm extends Component {
  render() {
    const { transferDetails, handleSend, buttonText } = this.props;
    return (
      <div className="confirm-form-container">
        <ConfirmFromTo transferDetails={transferDetails} />
        <DarkDivider className="confirm-form-amount-divider" />
        <ConfirmParticular
          className="confirm-form-amount-container"
          description="AMOUNT"
          price={`${transferDetails.metadata.transferAmount} DOT`}
        />
        <ConfirmParticular
          className="confirm-form-fee-container"
          description="FEE"
          price={`${transferDetails.metadata.transferFee} mDOT`}
        />
        <DarkDivider className="confirm-form-total-amount-divider" />
        <ConfirmParticular
          className="confirm-form-total-container"
          description="TOTAL"
          price={`${transferDetails.metadata.totalTransferAmount} DOT`}
        />
        <FooterButton onClick={handleSend} name={buttonText} />
      </div>
    );
  }
}
