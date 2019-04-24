import React, { Component } from 'react';
import Footer from '../../common/footer';
import ButtonMD from '../../common/buttons/button-md';

export default class TOUFooter extends Component {
  render() {
    const {
      buttonName, disabled, onClick, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Footer>
          <ButtonMD disabled={disabled} onClick={onClick}>
            {buttonName}
          </ButtonMD>
        </Footer>
      </div>
    );
  }
}
