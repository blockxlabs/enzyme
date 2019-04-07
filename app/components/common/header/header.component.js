import React, { Component } from 'react';
import FontRegular from '../fonts/font-regular';
import './styles.css';

export default class Header extends Component {
  handleHeadingClick = async () => {};

  render() {
    return (
      <div className="header-container">
        {/*TODO DP: Replace <div /> with image element after Enzyme Logo is available */}
        <div className="header-logo" onClick={this.handleHeadingClick} />
        <FontRegular className="header-text">Enzyme</FontRegular>
      </div>
    );
  }
}
