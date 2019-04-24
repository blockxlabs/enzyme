import React, { PureComponent } from 'react';

export default class FontLight extends PureComponent {
  render() {
    const { style, text, ...otherProps } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Light',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}
