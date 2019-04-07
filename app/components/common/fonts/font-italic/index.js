import React, { PureComponent } from 'react';

export default class FontItalic extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'Roboto-Italic',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
