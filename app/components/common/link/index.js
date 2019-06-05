import React, { Component } from 'react';
import './styles.css';

class Link extends Component {
  render() {
    const { style, className, ...otherProps } = this.props;
    return (
      <span className={className}>
        <a
          style={{
            fontFamily: 'Roboto-Medium',
            ...style,
          }}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          {...otherProps}
        >
          {this.props.children}
        </a>
      </span>
    );
  }
}

export default Link;
