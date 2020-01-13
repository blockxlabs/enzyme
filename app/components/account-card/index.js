import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '../common/identicon';
import { MoreVertIcon } from '../common/icon';
import EnzymeMenu from '../common/enzyme-menu';
import ClickToCopyAddress from '../common/click-to-copy-address';
import DarkDivider from '../common/divider/dark-divider';
import './styles.css';

export default class AccountCard extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNullBalanceObject = (balObj, account) => {
    if (!balObj) {
      return {
        balanceFormatted: '0.0',
        token: account.token,
      };
    }
    return balObj;
  };

  render() {
    const {
      account,
      onCopyAddress,
      onMoreMenuOptionsChange,
      moreMenu,
      handleChangeAccount,
      isMoreVertIconVisible,
      ...otherProps
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div {...otherProps}>
        <ListItem>
          <ListItemAvatar onClick={event => handleChangeAccount(event, account)}>
            <Avatar
              className="account-avatar"
              onCopyAddress={onCopyAddress}
              value={account.address}
              style={{ cursor: 'pointer !important' }}
            />
          </ListItemAvatar>
          <ListItemText
            onClick={event => handleChangeAccount(event, account)}
            primary={account.alias}
            secondary={(
              <ClickToCopyAddress
                className="account-address clickable-icon"
                onCopyAddress={onCopyAddress}
                address={account.address}
              />
            )}
          />
          {isMoreVertIconVisible && (
            <MoreVertIcon
              color="rgba(0, 0, 0, 1)"
              onClick={this.handleClick}
              className="more-list-icon"
            />
          )}
          <EnzymeMenu
            options={moreMenu}
            onChange={option => {
              onMoreMenuOptionsChange(option, account);
            }}
            anchorEl={anchorEl}
            onClose={this.handleClose}
          />
        </ListItem>
        <DarkDivider style={{ width: '100%' }} />
      </div>
    );
  }
}
