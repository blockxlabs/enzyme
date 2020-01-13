import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import Link from '../../common/link';
import './styles.css';

export default class FaucetLink extends Component {
  render() {
    const { network, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {network.faucetUrl ? (
          <div>
            <FontRegular
              className="faucets-message-text"
              text="If you need test DOTs can grab them at"
            />
            <Link style={{ fontSize: 16 }} href={network.faucetUrl}>
              {network.faucetText}
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}
