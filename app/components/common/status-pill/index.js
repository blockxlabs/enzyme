import React, { Component } from 'react';
import './styles.css';

class StatusPill extends Component {
  render() {
    const {
      props: { text, color, backgroundColor },
    } = this;
    return (
      <div
        className="pillstatus-box"
        style={{
          backgroundColor: `${backgroundColor}`,
        }}
      >
        <div className="pillstatus-text" style={{ color: `${color}` }}>
          {text}
        </div>
      </div>
    );
  }
}

export default StatusPill;
