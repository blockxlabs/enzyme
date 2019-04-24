import React, { Component } from 'react';
import DarkDivider from '../../common/divider/dark-divider';
import TransferFromTo from '../transfer-from-to';
import FooterButton from '../../common/footer-button';
import TransferFormAmount from '../transfer-form-amount';
import './styles.css';

export default class TransferForm extends Component {
  render() {
    const {
      address,
      alias,
      to,
      amount,
      units,
      toRef,
      amountRef,
      isAddressEncoded,
      isToError,
      toErrorText,
      isAmountError,
      amountErrorText,
      unit,
      buttonText,
      amountPropName,
      toPropName,
      handleAmountChange,
      handleToChange,
      handleSendButton,
      handleUnitOnChange,
      onBlur,
    } = this.props;
    return (
      <div className="transfer-form-container">
        <TransferFromTo
          address={address}
          alias={alias}
          isToError={isToError}
          isAddressEncoded={isAddressEncoded}
          toPropName={toPropName}
          to={to}
          toRef={toRef}
          toErrorText={toErrorText}
          handleToChange={handleToChange}
          onBlur={onBlur}
        />
        <DarkDivider className="transfer-form-divider" />
        <TransferFormAmount
          className="transfer-form-amount-container"
          error={isAmountError}
          label="Amount"
          value={amount}
          helperText={amountErrorText}
          onChange={handleAmountChange}
          propName={amountPropName}
          onBlur={onBlur}
          inputRef={amountRef}
          options={units}
          dropDownValue={unit}
          onDropDownChange={handleUnitOnChange}
        />
        <DarkDivider className="transfer-form-divider" />
        <FooterButton onClick={handleSendButton} name={buttonText} />
      </div>
    );
  }
}
