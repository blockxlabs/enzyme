import React, { Component } from 'react';
import ButtonMD from '../buttons/button-md';

export default class FooterWithTwoButton extends Component {
  render() {
    const {
      style,
      backButtonName,
      nextButtonName,
      onBackClick,
      onNextClick,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '524px',
          right: '18px',
          left: '18px',
          justifyContent: 'space-between',
          display: 'flex',
          ...style,
        }}
        {...otherProps}
      >
        <ButtonMD onClick={onBackClick}>{backButtonName}</ButtonMD>
        <ButtonMD onClick={onNextClick}>{nextButtonName}</ButtonMD>
      </div>
    );
  }
}
