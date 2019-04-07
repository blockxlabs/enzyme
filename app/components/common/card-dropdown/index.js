import React, { Component } from 'react';

// Import Modules
import Animated from 'animated/lib/targets/react-dom';
import classNames from 'classnames';

// Import Other Components
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import FontMedium from '../fonts/font-medium';
import FontRegular from '../fonts/font-regular';
import DarkDivider from '../divider/dark-divider';
import BlockiesAvatar from '../blockies-avatar/blockies-avatar';

// Import Services
import { convertNumberToFormattedString } from '../../../services/numberFormatter';

import './styles.css';

export default class CardDropdown extends Component {
  constructor(props) {
    super(props);

    const { items } = this.props;
    this.DROPDOWN_ELEMENT_HEIGHT = items.length > 3 ? 200 : 57.5 * items.length;

    this.state = {
      dropdownHeight: new Animated.Value(0),
      cardBorderRadius: new Animated.Value(15),
      toggleDropdown: false,

      // Mock Data
      selectedItem: this.props.defaultItem,
    };
  }

  handleDropdown = () => {
    /* Set-state being called multiple times on purpose within this method */

    // Declare Variables
    const { dropdownHeight, cardBorderRadius, toggleDropdown } = this.state;

    // Toggle Animation
    if (!toggleDropdown) {
      // this.setState({ toggleDropdown: !this.state.toggleDropdown }, () => {
      //   Animated.spring(dropdownHeight, { toValue: 200 }).start();
      // });

      Animated.timing(cardBorderRadius, { toValue: 0, duration: 150 }).start(() => {
        this.setState({ toggleDropdown: !this.state.toggleDropdown }, () => {
          Animated.spring(dropdownHeight, {
            toValue: this.DROPDOWN_ELEMENT_HEIGHT,
            duration: 200,
          }).start();
        });
      });
    } else {
      // Animated.timing(dropdownHeight, { toValue: 0, duration: 300 }).start(() => {
      //   this.setState({ toggleDropdown: !this.state.toggleDropdown });
      // });

      Animated.timing(dropdownHeight, { toValue: 0, duration: 260 }).start(() => {
        this.setState({ toggleDropdown: !this.state.toggleDropdown }, () => {
          Animated.timing(cardBorderRadius, {
            toValue: 15,
            duration: 150,
          }).start();
        });
      });
    }
  };

  handleCardDropdownSelection = index => {
    // Declare Variables
    const { items, onChange, onSelect } = this.props;

    // Set State
    this.setState({ selectedItem: items[index] });

    // Call Props method and pass synthetic event
    const eventObj = {
      target: {
        name: this.props.name,
        value: items[index].wallet.address,
      },
    };

    // Pass item to Parent
    onChange(eventObj);
    onSelect(items[index]);
    this.handleDropdown();
  };

  getDropdownElements = () => {
    const { items } = this.props;

    if (items.length === 0) return;

    const dropdownElements = items.map((item, index) => {
      const dropdownElementsClassNames = classNames({
        'card-dropdown-component-elements': true,
        'card-dropdown-component-elements-selected':
          this.state.selectedItem.wallet.alias === item.wallet.alias,
      });

      const dropdownBlockiesClassNames = classNames({
        'card-dropdown-component-elements-blockies': true,
        'card-dropdown-component-elements-blockies-selected':
          this.state.selectedItem.wallet.alias === item.wallet.alias,
      });

      const dropdownAvatarClassNames = classNames({
        'card-dropdown-component-elements-avatar': true,
        'card-dropdown-component-elements-avatar-selected':
          this.state.selectedItem.wallet.alias === item.wallet.alias,
      });

      const fontSelectedClassNames = classNames({
        'card-dropdown-component-elements-selected':
          this.state.selectedItem.wallet.alias === item.wallet.alias,
      });

      return (
        <div
          key={`card-dropdown-elements-${index + 1}`}
          className={dropdownElementsClassNames}
          onClick={this.handleCardDropdownSelection.bind(this, index)}
        >
          <div className={dropdownAvatarClassNames}>
            <BlockiesAvatar className={dropdownBlockiesClassNames} seed={item.wallet.address} />
          </div>

          <div style={{ backgroundColor: 'white' }}>
            <div className="card-dropdown-component-elements-main">
              <FontMedium className={fontSelectedClassNames} style={{ fontSize: 13 }}>
                {item.wallet.alias}
              </FontMedium>
              <FontRegular style={{ fontSize: 10 }}>
                {`${convertNumberToFormattedString(
                  item.selectedToken.balance.amount,
                )} ${item.selectedToken.symbol.toUpperCase()}`}
              </FontRegular>
              <FontRegular style={{ fontSize: 10, opacity: 0.5 }}>
                {item.selectedToken.balance.usd
                  ? `$${convertNumberToFormattedString(item.selectedToken.balance.usd)} USD`
                  : null}
              </FontRegular>
            </div>
            <DarkDivider />
          </div>
        </div>
      );
    });

    // return <div style={{ paddingTop: 10, backgroundColor: '#007eb9' }}>{dropdownElements}</div>;
    return dropdownElements;
  };

  render() {
    // Declare Variables
    const {
      dropdownHeight, cardBorderRadius, toggleDropdown, selectedItem
    } = this.state;

    const { items } = this.props;

    // Declare Classnames
    const cardDivClassNames = classNames({
      'card-dropdown-container': true,
      'card-dropdown-shadow': true,
    });

    const dropdownDivClassNames = classNames({
      'card-dropdown-component': true,
      'card-dropdown-shadow': true,
      'card-dropdown-component-no-border': !toggleDropdown,
      'card-dropdown-component-scroll': items.length > 3,
    });

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <Animated.div
          className={cardDivClassNames}
          style={{
            borderBottomLeftRadius: cardBorderRadius,
            borderBottomRightRadius: cardBorderRadius,
            zIndex: this.props.zIndex + 1,
          }}
        >
          <Animated.div
            className="card-dropdown-left-avatar"
            style={{
              borderBottomLeftRadius: cardBorderRadius,
            }}
          >
            {/* <div
              style={{
                height: 25,
                width: 25,
                borderRadius: 25,
                backgroundColor: 'white'
              }}
            /> */}
            <BlockiesAvatar className="card-dropdown-blockies" seed={selectedItem.wallet.address} />
          </Animated.div>
          <div className="card-dropdown-main">
            {items.length === 0 ? (
              <FontMedium style={{ fontSize: 15 }}>Loading..</FontMedium>
            ) : (
              <span>
                <FontMedium style={{ fontSize: 15 }}>
                  {selectedItem.wallet.imported
                    ? `${selectedItem.wallet.alias} Imported`
                    : selectedItem.wallet.alias}
                </FontMedium>
                <FontRegular style={{ fontSize: 12 }}>
                  {`${convertNumberToFormattedString(
                    selectedItem.selectedToken.balance.amount,
                  )} ${selectedItem.selectedToken.symbol.toUpperCase()}`}
                </FontRegular>
                <FontRegular style={{ fontSize: 12, opacity: 0.5 }}>
                  {selectedItem.selectedToken.balance.usd
                    ? `$${convertNumberToFormattedString(
                      selectedItem.selectedToken.balance.usd,
                    )} USD`
                    : null}
                </FontRegular>
              </span>
            )}
          </div>
          <div
            className="card-dropdown-right-dropdown-icon"
            // onClick={this.handleDropdown}
          >
            {/* <FontAwesomeIcon
              icon={faSortDown}
              style={{ height: 25, width: 25, color: '#C5C5C5' }}
            /> */}
          </div>
        </Animated.div>
        <Animated.div
          className={dropdownDivClassNames}
          style={{
            height: dropdownHeight,
            zIndex: 2,
          }}
        >
          {items.length > 0 ? this.getDropdownElements() : null}
        </Animated.div>
      </div>
    );
  }
}
