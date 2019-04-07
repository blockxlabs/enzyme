import React, { Component } from 'react';
import './styles.css';

class StatusPill extends Component {
  render() {
    const {
      props: {
        text, borderColor, textColor, background
      },
    } = this;
    return (
      <div
        className="pillstatus-box"
        style={{ borderColor: `${borderColor}`, background: `${background}` }}
      >
        <p className="pillstatus-text" style={{ color: `${textColor}` }}>
          {text}
        </p>
      </div>
    );
  }
}

export default StatusPill;
