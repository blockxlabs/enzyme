import React, { Component } from 'react';

export default class LightDivider extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <div
        style={{
          width: '100vw',
          backgroundColor: '#FFFFFF',
          opacity: 0.2,
          height: 1,
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}
