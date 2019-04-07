import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Animated from 'animated/lib/targets/react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import WalletDropdownItem from './WalletDropdownItem';
import { createToast } from '../../constants/toast';
import { updateWalletList, changeCurrentWallet } from '../../constants/wallets';

import {
  WALLET_DROPDOWN_ITEM_HEIGHT,
  WALLET_DROPDOWN_INPUT_HEIGHT,
  WALLET_DROPDOWN_EMPTY_SEARCH_HEIGHT,
  toggleWalletDropdown,
  WALLET_DROPDOWN,
  applicationSettingsAnimatedMap,
} from '../../constants/animation';
import { WALLET_SEARCH_REGEX } from '../../../lib/constants/regex';
import { renameWallet } from '../../services/walletService';
import { setLocalStorage, getLocalStorage } from '../../../lib/services/extension/storage';
import { TRANSACTIONS } from '../../../lib/constants/storageKeys';
import { animateApplicationSetting } from '../../services/animationService';
import './styles.css';

const mapStateToProps = state => ({
  currentWalletBalance: state.wallets.currentWalletBalance,
  wallets: state.wallets.wallets,
  currentWallet: state.wallets.currentWallet,
  token: state.appState.token,
  showWalletDropdown: state.animationReducer.showWalletDropdown,
  currentNetwork: state.networks.currentNetwork,
});

const walletDropdownAnimatedHeight = applicationSettingsAnimatedMap.get(WALLET_DROPDOWN);

class WalletDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      filteredList: [],
      editWalletIndex: -1,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.filteredList.length === 0 && state.searchQuery !== '') {
      Animated.spring(walletDropdownAnimatedHeight, {
        toValue: WALLET_DROPDOWN_EMPTY_SEARCH_HEIGHT,
      }).start();
    } else if (props.showWalletDropdown && state.filteredList.length > 0) {
      const toValue = state.filteredList.length <= 3
        ? state.filteredList.length * WALLET_DROPDOWN_ITEM_HEIGHT
            + WALLET_DROPDOWN_INPUT_HEIGHT
            - 1
        : 252.5 - 1;

      Animated.spring(walletDropdownAnimatedHeight, {
        toValue,
      }).start();
    }

    if (!props.showWalletDropdown) {
      return {
        searchQuery: '',
        filteredList: [],
      };
    }
    return null;
  }

  handleSearchInput = event => {
    const { name, value } = event.target;
    const { walletBalanceArr } = this.props;
    const searchString = this.escapeRegExp(value);
    // eslint-disable-next-line
    const filteredList = walletBalanceArr.filter(walletObj => walletObj.wallet.alias.match(new RegExp(searchString, 'i')),);

    this.setState({
      [name]: value,
      filteredList,
    });
  };

  handleCreateWallet = async () => {
    // Animate Settings Out
    this.props.toggleWalletDropdown(!this.props.showWalletDropdown);

    // Shrink Wallet
    animateApplicationSetting(WALLET_DROPDOWN, 0, async () => {
      await this.createWallet();
    });
  };

  createWallet = async () => {
    const { token } = this.props;

    if (token !== undefined) {
      const data = undefined;

      this.props.createToast({
        message: 'Wallet was successfully created.',
        type: 'success',
      });

      // Update Wallet List and set new wallet as Current Wallet
      this.props.updateWalletList(data.wallets);
      this.props.changeCurrentWallet(data.currentWallet);

      // Get Transaction Object
      const transactionsLocalStorageObj = await getLocalStorage(TRANSACTIONS);
      const transactions = JSON.parse(transactionsLocalStorageObj.transactions);

      // Declare Empty Transactions Array for new Wallet
      transactions[data.currentWallet.address] = [];

      // Store Transactions
      await setLocalStorage('transactions', JSON.stringify(transactions));

      // Initialize Wallet
      await this.props.initializeWallet();
    }
  };

  handleWalletSelection = wallet => {
    this.props.changeCurrentWallet(wallet);
    this.props.toggleWalletDropdown(!this.props.showWalletDropdown);
    animateApplicationSetting(WALLET_DROPDOWN, 0, () => {
      this.props.fetchTransactionList();
      this.props.getCurrentWalletBalance();
    });

    // Clear Search
    this.setState({
      searchQuery: '',
      editWalletIndex: -1,
    });
  };

  handleWalletNameChange = (index, callback) => {
    this.setState(
      {
        editWalletIndex: index,
      },
      () => {
        callback();
      },
    );
  };

  handleSaveWalletName = (newAlias, wallet, index) => {
    const { wallets } = this.props;

    let walletArr;
    try {
      walletArr = renameWallet(newAlias, wallet, index, wallets);
    } catch (error) {
      this.props.createToast({
        message: error.message,
        type: 'warning',
      });

      throw error;
    }

    if (walletArr !== undefined) {
      this.props.updateWalletList(walletArr);
      this.props.createToast({
        message: `Wallet name successully changed to ${newAlias}.`,
        type: 'success',
      });
    }

    this.setState({
      editWalletIndex: -1,
    });

    return walletArr;
  };

  escapeRegExp(text) {
    return text.replace(WALLET_SEARCH_REGEX, '\\$&');
  }

  renderWalletList = () => {
    const { currentWallet, walletBalanceArr } = this.props;
    const { filteredList, searchQuery, editWalletIndex } = this.state;

    let searchList = walletBalanceArr;

    if (searchQuery !== '') {
      searchList = filteredList;
    }

    if (searchList.length === 0) {
      return (
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          <span className="wallet-list-wallet-obj" style={{ display: 'block' }}>
            <FontAwesomeIcon
              style={{
                color: '#6d93a4',
                fontSize: 15,
                marginRight: 6,
              }}
              icon={faInfoCircle}
            />
            No wallets found that match
            <br />
            the search query.
          </span>
        </div>
      );
    }

    const walletListElements = searchList.map((walletObj, index) => (
      <WalletDropdownItem
        key={walletObj.wallet.alias}
        index={index}
        editable={index === editWalletIndex}
        walletObj={walletObj}
        currentWallet={currentWallet}
        showDivider={searchList.length - 1 === index}
        handleWalletSelection={this.handleWalletSelection}
        handleWalletNameChange={this.handleWalletNameChange}
        handleSaveWalletName={this.handleSaveWalletName}
      />
    ));

    return walletListElements;
  };

  render() {
    const { walletBalanceArr } = this.props;
    const { searchQuery, filteredList } = this.state;

    let searchList = walletBalanceArr;

    if (searchQuery !== '') {
      searchList = filteredList;
    }

    const walletListContainer = classNames({
      'wallet-list-container': true,
    });

    const walletListHeight = searchList.length <= 3
      ? searchList.length * WALLET_DROPDOWN_ITEM_HEIGHT + WALLET_DROPDOWN_INPUT_HEIGHT
      : 202.5;

    const walletListItemsContainerClassName = classNames({
      'wallet-list-content': searchList.length > 3,
      'wallet-list-content-without-scroll': searchList.length <= 3,
    });

    return (
      <div className={walletListContainer}>
        <div className="wallet-list-search-container">
          <div className="wallet-list-search-container-input">
            <span>
              <FontAwesomeIcon icon={faSearch} style={{ color: '#6D93A4', fontSize: 15 }} />
            </span>
            <input
              name="searchQuery"
              value={searchQuery}
              className="wallet-list-search-input-element"
              type="text"
              onChange={this.handleSearchInput}
              placeholder="Search for a wallet..."
            />
          </div>

          <FontAwesomeIcon
            onClick={this.handleCreateWallet}
            className="wallet-list-search-container-secondary-icon"
            icon={faPlus}
          />
        </div>
        <div className={walletListItemsContainerClassName} style={{ height: walletListHeight }}>
          {this.renderWalletList()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCurrentWallet: wallet => dispatch(changeCurrentWallet(wallet)),
  updateWalletList: wallets => dispatch(updateWalletList(wallets)),
  createToast: option => dispatch(createToast(option)),
  toggleWalletDropdown: bool => dispatch(toggleWalletDropdown(bool)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletDropdown);
