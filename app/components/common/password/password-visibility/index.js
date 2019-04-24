import React, { Component } from 'react';
import { IconVisibility } from '../../icon';

export default class PasswordVisibility extends Component {
  render() {
    const {
      showPassword, showColor, hideColor, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {showPassword ? <IconVisibility style={showColor} /> : <IconVisibility style={hideColor} />}
      </div>
    );
  }
}
