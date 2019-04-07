import React, { PureComponent } from 'react';

export default class FontRegular extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Regular',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
