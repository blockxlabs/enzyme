import React, { Component } from 'react';
import ButtonMD from '../buttons/button-md';
import './styles.css';

export default class FooterTwoMDButton extends Component {
  render() {
    const {
      style,
      namePrimary,
      nameSecondary,
      onClickPrimary,
      onClickSecondary,
      ...otherProps
    } = this.props;
    return (
      <div className="footer-two-button-container" style={style} {...otherProps}>
        <ButtonMD color="primary" onClick={onClickPrimary}>
          {namePrimary}
        </ButtonMD>
        <ButtonMD color="secondary" onClick={onClickSecondary}>
          {nameSecondary}
        </ButtonMD>
      </div>
    );
  }
}
