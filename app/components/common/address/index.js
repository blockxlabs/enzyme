import React, { Component } from 'react';
import { shortenAddress } from '../../../services/wallet-service';

export default class Address extends Component {
  render() {
    const {
      style, hash, text, isCopy, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Regular',
          ...style,
        }}
        {...otherProps}
      >
        {`${shortenAddress(hash)} ${text || ''}`}
      </div>
    );
  }
}
