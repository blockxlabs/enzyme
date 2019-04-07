import React, { PureComponent } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import './styles.css';

export default class FontHeader extends PureComponent {
  render() {
    const { children, style, ...otherProps } = this.props;
    return (
      <Animated.div
        className="font-header"
        style={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          width: 0,
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </Animated.div>
    );
  }
}
