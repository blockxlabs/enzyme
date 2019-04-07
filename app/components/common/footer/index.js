import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import './styles.css';

class Footer extends Component {
  render() {
    return (
      <Animated.div className="footer-container" {...this.props}>
        <div className="footer-content">{this.props.children}</div>
      </Animated.div>
    );
  }
}

export default Footer;
