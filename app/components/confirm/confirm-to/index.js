import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import Address from '../../common/address';

export default class ConfirmTo extends Component {
  render() {
    const { address, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <Avatar theme="polkadot" size={44} value={address} />
        <Address style={{ marginLeft: '22px' }} hash={address} />
      </div>
    );
  }
}
