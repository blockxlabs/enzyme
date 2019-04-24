import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import ClickToCopy from '../../common/click-to-copy';
import Address from '../../common/address';
import './styles.css';

export default class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: <Address className="address" hash={props.address} />,
    };
  }

  toggleCopyTextOn = () => {
    this.setState({
      text: 'Click to copy',
    });
  };

  toggleCopyTextOff = () => {
    this.setState({
      text: <Address className="address" hash={this.props.address} />,
    });
  };

  toggleCopyTextOn = () => {
    this.setState({
      text: 'Click to copy',
    });
  };

  toggleCopyTextOff = () => {
    this.setState({
      text: <Address className="address" hash={this.props.address} />,
    });
  };

  render() {
    const {
      alias, onCopyAddress, address, ...otherProps
    } = this.props;
    const { text } = this.state;
    return (
      <div {...otherProps}>
        <FontRegular className="account-alias" text={alias} />
        <ClickToCopy
          onMouseEnter={this.toggleCopyTextOn}
          onMouseLeave={this.toggleCopyTextOff}
          className="account-address"
          onCopy={onCopyAddress}
          value={address}
          text={text}
        />
      </div>
    );
  }
}
