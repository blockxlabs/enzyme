import React, { Component } from 'react';
import { IconSettings } from '../common/icon';
import EnzymeMenu from '../common/enzyme-menu';

export default class Options extends Component {
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
    const { options, onOptionsChange, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <IconSettings
          style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '18px' }}
          onClick={this.handleClick}
        />
        <EnzymeMenu
          options={options}
          onChange={onOptionsChange}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
