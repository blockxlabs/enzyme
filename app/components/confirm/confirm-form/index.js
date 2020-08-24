import React, { Component } from 'react';
import DarkDivider from '../../common/divider/dark-divider';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import ConfirmFromTo from '../confirm-from-to';
import './styles.css';

export default class ConfirmForm extends Component {
  render() {
    const {
      confirmDetails: {
        metadata: {
          to,
          account: { address, alias },
          transferAmount,
          transferFee,
          totalTransferAmount,
        },
      },
      handleSend,
      buttonText,
      theme,
    } = this.props;
    return (
      <div className="confirm-form-container">
        <ConfirmFromTo to={to} theme={theme} from={address} alias={alias} />
        <DarkDivider className="confirm-form-amount-divider" />
        <ConfirmParticular
          className="confirm-form-amount-container"
          description="AMOUNT"
          price={`${transferAmount}`}
        />
        <ConfirmParticular
          className="confirm-form-fee-container"
          description="FEE"
          price={`${transferFee}`}
        />
        <DarkDivider className="confirm-form-total-amount-divider" />
        <ConfirmParticular
          className="confirm-form-total-container"
          description="TOTAL"
          price={`${totalTransferAmount}`}
        />
        <FooterButton onClick={handleSend} name={buttonText} />
      </div>
    );
  }
}
