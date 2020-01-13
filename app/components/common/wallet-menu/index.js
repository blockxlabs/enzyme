import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles } from './styles';
import { IconCheckCircle } from '../icon/index';
import FontRegular from '../fonts/font-regular';

const ITEM_HEIGHT = 48;

class WalletMenu extends Component {
  handleClose = prop => () => {
    if (prop) {
      this.props.onChange(prop);
    }
    this.props.onClose();
  };

  render() {
    const {
      classes, options, anchorEl, selected
    } = this.props;

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={this.handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 140,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            backgroundColor: 'rgba(38, 38, 38, 1)',
          },
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            onClick={this.handleClose(option)}
            disableGutters
            classes={{
              root: classes.root,
            }}
          >
            <FontRegular style={{ fontSize: 14 }} text={option.text} />
            {selected
              && (selected.value !== option.value ? null : (
                <IconCheckCircle style={{ marginLeft: 5, display: 'inline-flex' }} />
              ))}
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default withStyles(styles)(WalletMenu);
