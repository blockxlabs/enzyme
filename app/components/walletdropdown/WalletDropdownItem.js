import React, { Component } from 'react';

// Import Libraries
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faFileImport } from '@fortawesome/free-solid-svg-icons';

// Import Components
import BlockiesAvatar from '../common/blockies-avatar/blockies-avatar';
import LightDivider from '../common/divider/light-divider';

// Import Services
import { toFormat } from '../../services/numberFormatter';

// Import Styles
import './styles.css';

class WalletDropdownItem extends Component {
  constructor(props) {
    super(props);

    // Declare Ref
    this.walletNameInputRef = React.createRef();

    this.state = {
      error: false,
    };
  }

  handleWalletSelection = () => {
    this.props.handleWalletSelection(this.props.walletObj.wallet);
  };

  handleWalletNameChange = event => {
    event.stopPropagation();

    this.props.handleWalletNameChange(this.props.index, () => {
      this.walletNameInputRef.current.focus();
      if (this.walletNameInputRef.current.value.length > 0) {
        this.walletNameInputRef.current.select();
      }
    });
  };

  handleInputOnClick = event => {
    event.stopPropagation();
  };

  handleSaveWalletName = event => {
    event.stopPropagation();

    // Declare Variables
    const editedAlias = this.walletNameInputRef.current.value.trim();
    const {
      walletObj: { wallet },
      index,
    } = this.props;
    let result;

    // Rename Wallet
    try {
      result = this.props.handleSaveWalletName(editedAlias, wallet, index);
    } catch (error) {
      this.setState({
        error: true,
      });
      return;
    }

    // If Result returns wallet list
    if (result !== undefined && result.length > 0) {
      // Change Wallet Name within Component and select it
      const { walletObj } = this.props;
      const tempWalletObj = walletObj;
      tempWalletObj.wallet.alias = editedAlias;

      this.props.handleWalletSelection(tempWalletObj.wallet);
    } else if (result === undefined) {
      this.setState({ error: false });
    }
  };

  hanldeWalletInputOnChange = event => {
    event.stopPropagation();
  };

  handleInputKeyPress = event => {
    const { key } = event;

    if (key === 'Enter') {
      this.handleSaveWalletName(event);
    }
  };

  render() {
    const {
      currentWallet, showDivider, editable, walletObj
    } = this.props;
    const { error } = this.state;

    const walletLabelClassName = classNames({
      'wallet-list-wallet-obj-name-selected': currentWallet.address === walletObj.wallet.address,
      'wallet-list-wallet-obj-name-edit': editable,
      'wallet-list-wallet-obj-hidden-input': true,
      'wallet-list-wallet-obj-hidden-input-error': error,
    });
    const walletListBlockiesClassName = classNames({
      'wallet-list-blockies-icon': true,
      'wallet-list-blockies-icon-selected': currentWallet.address === walletObj.wallet.address,
    });

    return (
      <div
        className="wallet-list-item"
        key={walletObj.wallet.alias}
        onClick={this.handleWalletSelection}
      >
        <div className="wallet-list-wallet-icon">
          <BlockiesAvatar className={walletListBlockiesClassName} seed={walletObj.wallet.address} />
          {walletObj.wallet.imported && (
            <div className="wallet-list-imported-icon">
              <FontAwesomeIcon
                className="wallet-list-imported-icon-image"
                icon={faFileImport}
                data-tip
                data-for="importedWallet"
              />
              <ReactTooltip id="importedWallet" type="dark" effect="solid" place="right">
                <span>Imported</span>
              </ReactTooltip>
            </div>
          )}
        </div>
        <div className="wallet-list-wallet-obj">
          <div className="wallet-list-wallet-obj-name">
            <input
              onClick={this.handleInputOnClick}
              onDoubleClick={this.handleWalletNameChange}
              onChange={this.hanldeWalletInputOnChange}
              onKeyPress={this.handleInputKeyPress}
              ref={this.walletNameInputRef}
              readOnly={!editable}
              className={walletLabelClassName}
              defaultValue={`${walletObj.wallet.alias}`}
            />
          </div>

          <span className="wallet-list-wallet-obj-balance-details">
            {walletObj.dotToken ? `${toFormat(walletObj.dotToken.balance.amount)} DOT` : '0 DOT'}
            {' | '}
            <span className="wallet-list-wallet-obj-usd">
              {walletObj.dotToken ? `${toFormat(walletObj.dotToken.balance.usd)} USD` : '0 USD'}
            </span>
          </span>
        </div>
        <div className="wallet-list-wallet-right-icon">
          {editable ? (
            <FontAwesomeIcon
              className="wallet-list-edit-icon"
              onClick={this.handleSaveWalletName}
              icon={faSave}
              style={{ color: 'white', fontSize: 15 }}
            />
          ) : (
            <FontAwesomeIcon
              className="wallet-list-edit-icon"
              onClick={this.handleWalletNameChange}
              icon={faEdit}
              style={{ color: 'white', fontSize: 15 }}
            />
          )}
        </div>
        {showDivider ? (
          <div />
        ) : (
          <LightDivider className="wallet-list-divider" style={{ width: '95%' }} />
        )}
      </div>
    );
  }
}

export default WalletDropdownItem;
