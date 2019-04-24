import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';

export default class IconContainer extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <IconButton {...otherProps}>{children}</IconButton>;
  }
}
