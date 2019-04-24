import React, { Component } from 'react';
import Banner from '../../../images/enzyme_banner.png';

export default class EnzymeBanner extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Banner} alt="enzyme-banner" {...otherProps} />;
  }
}
