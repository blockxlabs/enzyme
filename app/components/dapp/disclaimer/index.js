import React, { Component } from 'react';
import { ExclamationTriangle } from '../../common/icon';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class Disclaimer extends Component {
  render() {
    const { notice, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <ExclamationTriangle className="disclaimer-icon" />
        <FontRegular text={notice} className="disclaimer-text" />
      </div>
    );
  }
}
