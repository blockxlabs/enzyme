import React, { Component } from 'react';
import ClickToCopy from '../click-to-copy';
import Address from '../address';

export default class ClickToCopyAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextOn: false,
    };
  }

  toggleCopyTextOff = () => {
    this.setState({
      isTextOn: false,
    });
  };

  toggleCopyTextOn = () => {
    this.setState({
      isTextOn: true,
    });
  };

  render() {
    const { onCopyAddress, address, ...otherProps } = this.props;
    const visibleAddress = this.state.isTextOn ? (
      'Click to copy'
    ) : (
      <Address className={this.props.className} hash={this.props.address} />
    );
    return (
      <ClickToCopy
        onMouseEnter={this.toggleCopyTextOn}
        onMouseLeave={this.toggleCopyTextOff}
        onCopy={onCopyAddress}
        value={address}
        text={visibleAddress}
        {...otherProps}
      />
    );
  }
}
