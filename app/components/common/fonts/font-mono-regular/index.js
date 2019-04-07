import React, { PureComponent } from 'react';

export default class FontMonoRegular extends PureComponent {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <p
        style={{
          fontFamily: 'RobotoMono-Regular',
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}
