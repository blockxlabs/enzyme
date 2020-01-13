import React, { Component } from 'react';
import ButtonSM from '../buttons/button-sm';
import './styles.css';

export default class FooterTwoSMButton extends Component {
  render() {
    const {
      style,
      namePrimary,
      nameSecondary,
      onClickPrimary,
      onClickSecondary,
      isPrimaryDisabled,
      isSecondaryDisabled,
      ...otherProps
    } = this.props;
    return (
      <div className="footer-two-sm-button-container" style={style} {...otherProps}>
        <ButtonSM color="primary" onClick={onClickPrimary} disabled={isPrimaryDisabled}>
          {namePrimary}
        </ButtonSM>
        <ButtonSM color="secondary" onClick={onClickSecondary} disabled={isSecondaryDisabled}>
          {nameSecondary}
        </ButtonSM>
      </div>
    );
  }
}
