import React, { PureComponent } from 'react';

export default class FontLight extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Light',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
