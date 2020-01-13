import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import './styles.css';

export default class RequestType extends Component {
  render() {
    const { type, blockchain, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontMedium text={type} className="request-type-text" />
      </div>
    );
  }
}
