import React, { Component } from 'react';

// Import Components

import Divider from '../divider/dark-divider';
import SessionTimeout from '../../sessiontimeout';
import ExportSeedWords from '../../exportseedwords';

// Import Styles
import './styles.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings-grid-container">
        <ExportSeedWords className="settings-export-seed-words" />
        <Divider className="settings-export-seed-words-divider" />
        <SessionTimeout className="settings-session-timeout" />
      </div>
    );
  }
}

export default Settings;
