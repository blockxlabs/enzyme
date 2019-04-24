import React, { Component } from 'react';
import { Menu, MenuItem, withStyles } from '@material-ui/core';
import { styles } from './styles';

class EnzymeMenu extends Component {
  handleClose = prop => () => {
    if (prop) {
      this.props.onChange(prop);
    }
    this.props.onClose();
  };

  render() {
    const { classes, options, anchorEl } = this.props;

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose()}
        PaperProps={{
          style: {
            marginTop: 33,
            maxHeight: 144,
            width: 128,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            backgroundColor: 'rgba(38, 38, 38, 1)',
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
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default withStyles(styles)(EnzymeMenu);
