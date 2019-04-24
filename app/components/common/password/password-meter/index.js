import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PasswordMeter extends Component {
  render() {
    const {
      style, max, value, min, ...otherProps
    } = this.props;
    return (
      <div style={{ ...style }} {...otherProps}>
        <meter max={max} value={value} min={min} />
      </div>
    );
  }
}

PasswordMeter.defaultProps = {
  max: '4',
  score: 0,
  min: '0',
};

PasswordMeter.propTypes = {
  max: PropTypes.string,
  score: PropTypes.number,
  min: PropTypes.string,
};
