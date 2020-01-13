import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import { styles } from './styles';
import { IconCheckCircle } from '../icon/index';
import FontRegular from '../fonts/font-regular';

class EnzymeMenu extends Component {
  handleClose = prop => () => {
    if (prop) {
      this.props.onChange(prop);
    }
    this.props.onClose();
  };

  render() {
    const {
      isDeveloperMode,
      onToggleDeveloperMode,
      classes,
      options,
      anchorEl,
      selected,
      width,
    } = this.props;

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose()}
        PaperProps={{
          style: {
            marginTop: 33,
            maxHeight: 144,
            width: width !== undefined ? width : 128,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            backgroundColor: 'rgba(38, 38, 38, 1)',
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            onClick={option.toggle === true ? null : this.handleClose(option)}
            disableGutters
            classes={{
              root: classes.root,
            }}
          >
            <FontRegular style={{ fontSize: '14px' }} text={option.text} />
            {selected
              && (selected.value !== option.value ? null : (
                <IconCheckCircle style={{ marginLeft: 5 }} />
              ))}
            {option.toggle === true ? (
              <Switch
                color="primary"
                size="small"
                checked={isDeveloperMode}
                onChange={onToggleDeveloperMode}
              />
            ) : null}
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default withStyles(styles)(EnzymeMenu);
