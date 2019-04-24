import React, { Component } from 'react';
import Logo from '../../../images/enzyme_logo.png';

export default class EnzymeLogo extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Logo} {...otherProps} alt="enzyme_logo" />;
  }
}
