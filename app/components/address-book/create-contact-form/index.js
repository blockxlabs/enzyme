import React, { Component } from 'react';
import TransferTo from '../../transfer/transfer-to';
import EnzymeInput from '../../common/enzyme-input';
import FooterButton from '../../common/footer-button';
import DropDown from '../../common/drop-down';
import './styles.css';

export default class CreateContactForm extends Component {
  render() {
    const {
      address,
      theme,
      isAddressError,
      addressPropName,
      addressErrorMessage,
      addressInputRef,
      handleToChange,
      fname,
      fnameLabel,
      isFnameError,
      fnameErrorMessage,
      fnamePropName,
      handleFnameChange,
      handleFnameOnBlur,
      fnameInputRef,
      lname,
      lnameLabel,
      lnamePropName,
      lnameInputRef,
      isLnameError,
      lnameErrorMessage,
      handleLnameChange,
      handleLnameOnBlur,
      onSubmit,
      buttonName,
      networks,
      network,
      onNetworkChange,
    } = this.props;
    return (
      <div className="create-address-book-form">
        <TransferTo
          className="contact-to-container"
          addressValue={address}
          theme={theme}
          isError={isAddressError}
          label="Address"
          propName={addressPropName}
          toValue={address}
          errorMessage={addressErrorMessage}
          onChange={handleToChange}
          inputRef={addressInputRef}
        />
        <EnzymeInput
          className="contact-fname-input"
          value={fname}
          onChange={handleFnameChange(fnamePropName)}
          label={fnameLabel}
          error={isFnameError}
          helperText={fnameErrorMessage}
          name={fnamePropName}
          inputRef={fnameInputRef}
          onBlur={handleFnameOnBlur}
        />
        <EnzymeInput
          className="contact-lname-input"
          value={lname}
          onChange={handleLnameChange(lnamePropName)}
          label={lnameLabel}
          error={isLnameError}
          helperText={lnameErrorMessage}
          name={lnamePropName}
          inputRef={lnameInputRef}
          onBlur={handleLnameOnBlur}
        />
        <DropDown
          className="contact-network-dropdown"
          options={networks}
          disabled
          value={network}
          onChange={onNetworkChange}
        />

        <FooterButton onClick={onSubmit} name={buttonName} />
      </div>
    );
  }
}
