import React, { Component } from 'react';
import { InputAdornment } from '@material-ui/core';

export default class EnzymeInputAdornment extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <InputAdornment {...otherProps}>{children}</InputAdornment>;
  }
}
