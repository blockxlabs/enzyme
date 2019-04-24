import React, { PureComponent } from 'react';

export default class FontMedium extends PureComponent {
  render() {
    const { text, style, ...otherProps } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Medium',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}
