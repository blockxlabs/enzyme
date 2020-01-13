import React, { Component } from 'react';

export default class FavIcon extends Component {
  render() {
    const {
      favIconUrl, height, width, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <img src={favIconUrl} alt="identicon" height={height} width={width} />
      </div>
    );
  }
}
