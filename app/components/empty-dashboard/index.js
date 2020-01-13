import React, { Component } from 'react';
import FontLight from '../common/fonts/font-light';

export default class EmptyDashboard extends Component {
  render() {
    const { className, text, ...otherProps } = this.props;
    return <FontLight className={className} text={text} {...otherProps} />;
  }
}
