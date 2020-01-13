import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Identicon from '@polkadot/react-identicon';

export default class Avatar extends Component {
  render() {
    const {
      size, style, value, theme, onCopyAddress, ...otherProps
    } = this.props;
    return (
      <div style={{ style }} {...otherProps} onClick={onCopyAddress}>
        <Identicon value={value} size={size} theme={theme} />
      </div>
    );
  }
}

Avatar.defaultProps = {
  size: 44,
  value: undefined,
  theme: 'polkadot',
};

Avatar.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
  theme: PropTypes.string,
};
