import React, { Component, Fragment } from 'react';

// Import other Libararies
import Animated from 'animated/lib/targets/react-dom';
import classNames from 'classnames';

// Import Components
import FontLight from '../../fonts/font-light';
import FontMedium from '../../fonts/font-medium';
import DarkDivider from '../../divider/dark-divider';
import { shortenAddress } from '../../../../services/walletService';

// Import styles
import '../common-styles.css';
import './styles.css';

export default class DropdownInput extends Component {
  constructor(props) {
    super(props);

    // Declare Variable
    const { items, addressBook } = this.props;

    // Declare Height for dropdown based on number of items
    const addressBookLabelPadding = addressBook.length > 0 ? 1 : 0;
    this.DROPDOWN_ELEMENT_HEIGHT = items.length + addressBook.length + 1 + addressBookLabelPadding > 6
      ? 184
      : 48.5 * (items.length + addressBook.length + 1 + addressBookLabelPadding);

    this.state = {
      showDropdown: false,
      dropdownHeight: new Animated.Value(0),
      dropdownBorderRadius: new Animated.Value(20),
      selectedItem: undefined,
    };
  }

  handleShowDropdown = () => {
    Animated.timing(this.state.dropdownBorderRadius, {
      toValue: 0,
      duration: 150,
    }).start(() => {
      this.setState({ showDropdown: true }, () => {
        Animated.spring(this.state.dropdownHeight, {
          toValue: this.DROPDOWN_ELEMENT_HEIGHT,
        }).start();
      });
    });
  };

  handleHideDropdown = () => {
    Animated.timing(this.state.dropdownHeight, {
      toValue: 0,
      duration: 260,
    }).start(() => {
      this.setState({ showDropdown: false }, () => {
        Animated.timing(this.state.dropdownBorderRadius, {
          toValue: 20,
          duration: 150,
        }).start();
      });
    });
  };

  handleInputSelection = (index, arrayType) => {
    // Declare Variables
    const value = this.props[arrayType][index].address;

    this.setState({ selectedItem: this.props[arrayType][index] });

    // Call Props method and pass event
    const eventObj = {
      target: {
        name: this.props.name,
        value,
      },
    };

    this.props.onChange(eventObj);
  };

  getDropdownElements = () => {
    const { items, addressBook } = this.props;
    const { selectedItem } = this.state;

    const dividerClassNames = classNames({
      'wallet-dropdown-input-component-elements-divider': true,
      'wallet-dropdown-input-component-elements-divider-scroll':
        items.length + addressBook.length + 2 > 6,
    });

    const getAddressBookFor0ThIndex = index => (
      <div key={`input-dropdown-element-${index + 1}-address-book-title`}>
        <div className="wallet-dropdown-input-component-elements">
          <div
            className="wallet-dropdown-input-component-elements-name"
            style={{
              justifySelf: 'center',
            }}
          >
            <FontMedium style={{ fontSize: 14, marginBottom: -8 }}>Address Book</FontMedium>
          </div>
        </div>
      </div>
    );

    const getAddressBookForNon0ThIndex = (contact, index) => {
      const inputDropdownElementsClassNames = classNames({
        'wallet-dropdown-input-component-elements': true,
        'wallet-dropdown-input-component-elements-selected': selectedItem
          ? selectedItem.address === contact.address
          : false,
      });

      return (
        <div
          key={`input-dropdown-element-${index + 1}-address-book`}
          onMouseDown={this.handleInputSelection.bind(this, index, 'addressBook')}
          style={{ cursor: 'pointer' }}
        >
          <div className={inputDropdownElementsClassNames}>
            <div className="wallet-dropdown-input-component-elements-name">
              <FontMedium style={{ fontSize: 13 }}>{contact.alias}</FontMedium>
            </div>
            <div className="wallet-dropdown-input-component-elements-address">
              <FontLight style={{ fontSize: 12 }}>
                {` ${shortenAddress(contact.address)}`}
              </FontLight>
            </div>
          </div>
          <DarkDivider className={dividerClassNames} />
        </div>
      );
    };
    const getWalletAddressFor0ThIndex = index => (
      <div key={`input-dropdown-element-${index + 1}-address-book-title`}>
        <div className="wallet-dropdown-input-component-elements">
          <div className="wallet-dropdown-input-component-elements-name">
            <FontMedium style={{ fontSize: 14, marginBottom: -8 }}>Vault</FontMedium>
          </div>
        </div>
      </div>
    );

    const getWalletAddressForNon0ThIndex = (item, index) => {
      const inputDropdownElementsClassNames = classNames({
        'wallet-dropdown-input-component-elements': true,
        'wallet-dropdown-input-component-elements-selected': selectedItem
          ? selectedItem.alias === item.alias
          : false,
      });
      return (
        <div
          key={`input-dropdown-element-${index + 1}-wallets`}
          onMouseDown={this.handleInputSelection.bind(this, index, 'items')}
          style={{ cursor: 'pointer' }}
        >
          <div className={inputDropdownElementsClassNames}>
            <div className="wallet-dropdown-input-component-elements-name">
              <FontMedium style={{ fontSize: 13 }}>{item.alias}</FontMedium>
            </div>
            <div className="wallet-dropdown-input-component-elements-address">
              <FontLight style={{ fontSize: 12 }}>{` ${shortenAddress(item.address)}`}</FontLight>
            </div>
          </div>
          <DarkDivider className={dividerClassNames} />
        </div>
      );
    };
    const addressBookDropdownElements = addressBook.map((contact, index) => {
      if (contact.address !== undefined) {
        return (
          <Fragment>
            {index === 0 && getAddressBookFor0ThIndex(index)}
            {getAddressBookForNon0ThIndex(contact, index)}
          </Fragment>
        );
      }
    });

    const walletDropdownElements = items.map((item, index) => {
      if (item.address !== undefined) {
        return (
          <Fragment>
            {index === 0 && getWalletAddressFor0ThIndex(index)}
            {getWalletAddressForNon0ThIndex(item, index)}
          </Fragment>
        );
      }
    });

    return [...addressBookDropdownElements, ...walletDropdownElements];
  };

  render() {
    const {
      error, onChange, zIndex, items, value, addressBook, ...otherProps
    } = this.props;

    const { showDropdown, dropdownHeight, dropdownBorderRadius } = this.state;

    const walletDropdownInputClassNames = classNames({
      'wallet-dropdown-input-error': error,
      'wallet-dropdown-input': true,
    });

    const dropdownDivClassNames = classNames({
      'wallet-dropdown-input-component': true,
      'wallet-dropdown-input-component-scroll': items.length + addressBook.length + 2 > 6,
      'wallet-dropdown-input-no-border': !showDropdown,
      'wallet-dropdown-input-error': error,
    });

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <Animated.div
          className={walletDropdownInputClassNames}
          onFocus={this.handleShowDropdown}
          onBlur={this.handleHideDropdown}
          style={{
            borderBottomLeftRadius: dropdownBorderRadius,
            borderBottomRightRadius: dropdownBorderRadius,
          }}
        >
          <input
            className="wallet-hidden-input"
            onChange={onChange}
            value={value}
            {...otherProps}
          />
        </Animated.div>

        <Animated.div
          className={dropdownDivClassNames}
          style={{
            height: dropdownHeight,
            zIndex,
          }}
        >
          {this.getDropdownElements() || <p>Nothing to see here</p>}
        </Animated.div>
      </div>
    );
  }
}
