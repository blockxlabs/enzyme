import React, { Component } from 'react';
import { IconSettings } from '../common/icon';

export default class Settings extends Component {
  render() {
    const { ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <IconSettings style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '18px' }} />
      </div>
    );
  }
}
