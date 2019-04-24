import React, { Component } from 'react';
import ButtonMD from '../../common/buttons/button-md';

export default class TokenDetailFooter extends Component {
  render() {
    const {
      handleDeposit,
      handleSend,
      receiveButtonName,
      sendButtonName,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ButtonMD onClick={handleDeposit}>{receiveButtonName}</ButtonMD>
        <ButtonMD onClick={handleSend}>{sendButtonName}</ButtonMD>
      </div>
    );
  }
}
