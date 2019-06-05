import React, { Component } from 'react';
import EnzymeMenu from '../../common/enzyme-menu';
import FontRegular from '../../common/fonts/font-regular';
import { shortenName } from '../../../services/wallet-service';
import './styles.css';

export default class Network extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      networks, network, onNetworkChange, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular
          className="network-text"
          text={shortenName(network.text)}
          onClick={this.handleClick}
        />
        <EnzymeMenu
          selected={network}
          options={networks}
          onChange={onNetworkChange}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
