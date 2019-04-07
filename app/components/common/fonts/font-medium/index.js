import React, { PureComponent } from 'react';

export default class FontMedium extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Medium',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
