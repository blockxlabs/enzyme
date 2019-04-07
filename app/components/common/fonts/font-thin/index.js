import React, { PureComponent } from 'react';

export default class FontThin extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Thin',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
