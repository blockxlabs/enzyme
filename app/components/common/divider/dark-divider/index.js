import React, { Component } from 'react';

export default class DarkDivider extends Component {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <div
        style={{
          width: '100vw',
          height: '2px',
          backgroundColor: 'rgba(227, 227, 227, 1)',
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}
