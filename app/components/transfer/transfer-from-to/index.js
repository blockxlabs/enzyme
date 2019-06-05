import React, { Component } from 'react';
import { IconTransferFromTo } from '../../common/icon';
import TransferFrom from '../transfer-from';
import TransferTo from '../transfer-to';
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
      ...otherProps
    } = this.props;
    return (
      <div className="transfer-from-to-container" {...otherProps}>
        <TransferFrom alias={alias} address={address} />
        <IconTransferFromTo />
        <TransferTo
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
        />
      </div>
    );
  }
}
