import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

export default class IconContainer extends Component {
  render() {
    const { children, classes, ...otherProps } = this.props;
    return <IconButton {...otherProps}>{children}</IconButton>;
  }
}
