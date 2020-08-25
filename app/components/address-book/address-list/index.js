/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemCard from '../../common/list-item-card';
import './styles.css';

class AddressList extends Component {
  render() {
    const {
      classes,
      addressBook,
      onCopyAddress,
      moreMenu,
      onMoreMenuOptionsChange,
      isMoreVertIconVisible,
      handelChangeToAddress,
      theme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <List
          classes={{
            root: classes.root,
          }}
        >
          {addressBook.map(address => (
            <ListItemCard
              listItem={address}
              theme={theme}
              primaryText={`${address.fname}  ${address.lname}`}
              address={address.address}
              onCopyAddress={onCopyAddress}
              moreMenu={moreMenu}
              className="address-card-container"
              isMoreVertIconVisible={isMoreVertIconVisible}
              onMoreMenuOptionsChange={onMoreMenuOptionsChange}
              handleListItemAvatarClick={handelChangeToAddress}
              handleListItemClick={handelChangeToAddress}
            />
          ))}
        </List>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    paddingTop: '0px !important',
  },
});

export default withStyles(styles)(AddressList);
