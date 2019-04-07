import React, { PureComponent } from 'react';

export default class FontBold extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Bold',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
