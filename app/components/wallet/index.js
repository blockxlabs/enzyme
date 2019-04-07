import React, { Component } from 'react';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BlockiesAvatar from '../common/blockies-avatar/blockies-avatar';
import { shortenAddress } from '../../services/walletService';
import dropdownIcon from '../../images/angle-down-solid.svg';
import './styles.css';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copying: false,
    };
  }

  toggleCopyTextOn = () => {
    this.setState({
      copying: true,
    });
  };

  toggleCopyTextOff = () => {
    this.setState({
      copying: false,
    });
  };

  toggleCopyTextOn = () => {
    this.setState({
      copying: true,
    });
  };

  toggleCopyTextOff = () => {
    this.setState({
      copying: false,
    });
  };

  render() {
    const { selectedAccount } = this.props;
    const { copying } = this.state;

    const walletHeaderContainer = classNames({
      'wallet-container': true,
    });
    return (
      <div>
        <div className={walletHeaderContainer}>
          <div className="wallet-c1">
            <BlockiesAvatar className="walletCircle" seed={selectedAccount.address} />
          </div>
          <div className="wallet-c2">
            <span>
              {selectedAccount.alias}
              <br />
              <CopyToClipboard
                text={selectedAccount.address}
                onCopy={() => {
                  this.props.createToast({
                    message: 'Your wallet address has been copied to the clipboard.',
                    type: 'info',
                  });
                }}
              >
                <span
                  className="walSubTitle"
                  onMouseEnter={this.toggleCopyTextOn}
                  onMouseLeave={this.toggleCopyTextOff}
                >
                  {copying ? 'Copy wallet address' : shortenAddress(selectedAccount.address)}
                </span>
              </CopyToClipboard>
            </span>
          </div>
          <div className="wallet-c3">
            <div className="wallet-header-arrow-container">
              <img src={dropdownIcon} className="wallet-header-arrow" alt="wallet-dropdown" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
