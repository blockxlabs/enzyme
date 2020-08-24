import React, { Component } from 'react';
import { IconTransferFromTo } from '../../common/icon';
import TransferFrom from '../transfer-from';
import TransferToIcon from '../transfer-to-icon';
import './styles.css';

export default class TransferFromTo extends Component {
  render() {
    const {
      toRef,
      address,
      theme,
      alias,
      isToError,
      isAddressEncoded,
      toPropName,
      to,
      toErrorText,
      handleToChange,
      page,
      onAddressBookClick,
      ...otherProps
    } = this.props;
    return (
      <div className="transfer-from-to-container" {...otherProps}>
        <TransferFrom alias={alias} theme={theme} address={address} />
        <IconTransferFromTo />
        <TransferToIcon
          className="transfer-to-container"
          addressValue={to}
          theme={theme}
          isError={isToError}
          label="To"
          propName={toPropName}
          toValue={to}
          errorMessage={toErrorText}
          onChange={handleToChange}
          inputRef={toRef}
          onAddressBookClick={onAddressBookClick}
        />
      </div>
    );
  }
}
