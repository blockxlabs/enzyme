import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontRegular from '../../fonts/font-regular';
import PasswordMeter from '../password-meter';
import './styles.css';

export default class PasswordStrength extends Component {
  render() {
    const {
      max, score, min, title, ...otherProps
    } = this.props;
    return (
      <div className="password-meter-container" {...otherProps}>
        <FontRegular className="password-meter-title" text={title} />
        <PasswordMeter className="password-meter-bar" max={max} value={score} min={min} />
      </div>
    );
  }
}

PasswordMeter.defaultProps = {
  title: 'Password Strength',
};

PasswordMeter.propTypes = {
  title: PropTypes.string,
};
