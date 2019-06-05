import React, { Component } from 'react';
import './styles.css';

class Footer extends Component {
  render() {
    const { ...otherProps } = this.props;
    return (
      <div className="footer-container" {...otherProps}>
        <div className="footer-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Footer;
