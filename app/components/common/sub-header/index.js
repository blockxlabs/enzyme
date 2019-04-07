import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FontRegular from '../fonts/font-regular';

import './styles.css';

export default class SubHeader extends Component {
  render() {
    return (
      <div className="subheader-container subheader-shadow">
        <div className="subheader-icon clickable-icon" onClick={this.props.backBtnOnClick}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ height: 24, width: 21, color: '#33C7A5' }} />
        </div>
        <div className="subheader-title">
          <FontRegular
            style={{
              fontSize: 24,
              color: '#000000',
            }}
          >
            {this.props.title}
          </FontRegular>
        </div>
      </div>
    );
  }
}
