import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import FontRegular from '../fonts/font-regular';
import './styles.css';

const success = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
    </div>
    <div className="toast-message-message">
      <FontRegular style={{ fontSize: '14px', color: '#FFFFFF' }}>{msg}</FontRegular>
    </div>
  </div>
);

const info = (msg, isCustom) => {
  if (isCustom) {
    return (
      <div className="toast-message-custom-container">
        <div className="toast-message-custom-message">{msg}</div>
      </div>
    );
  }
  return (
    <div className="toast-message-container">
      <div className="toast-message-icon">
        <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
      </div>
      <div className="toast-message-message">
        <FontRegular style={{ fontSize: '14px', color: '#FFFFFF' }}>{msg}</FontRegular>
      </div>
    </div>
  );
};

const warning = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        style={{ color: '#FFFFFF', fontSize: '19px' }}
      />
    </div>
    <div className="toast-message-message">
      <FontRegular style={{ fontSize: '14px', color: '#FFFFFF' }}>{msg}</FontRegular>
    </div>
  </div>
);

const error = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
    </div>
    <div className="toast-message-message">
      <FontRegular style={{ fontSize: '14px', color: '#FFFFFF' }}>{msg}</FontRegular>
    </div>
  </div>
);

export {
  success, info, warning, error
};
