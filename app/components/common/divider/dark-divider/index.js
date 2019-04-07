import React, { Component } from 'react';

export default class DarkDivider extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <div
        style={{
          width: '100vw',
          backgroundColor: '#D5D5D5',
          height: 1,
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}
