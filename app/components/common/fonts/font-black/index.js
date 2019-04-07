import React, { PureComponent } from 'react';

export default class FontBlack extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Black',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
