import React, { Component } from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  helperText: {
    '&$helperTextError': {
      color: 'rgba(176, 0, 32, 1)',
      fontFamily: 'Roboto-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
  inputRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  inputUnderline: {
    '&::before': { border: 'none' },
    '&::after': { borderBottom: '2px solid rgba(215, 95, 160, 1)' },
    '&::hover': { border: 'none' },
  },
  inputErrorUnderline: {
    '&$inputError': {
      '&::before': { border: 'none' },
      '&::after': { borderBottom: '2px solid rgba(0, 0, 0, 0.3)' },
      '&::hover': { border: 'none' },
    },
  },
  inputError: {},
  rootLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '15px',
    fontFamily: 'Roboto-Regular',
    '&$focusedLabel': {
      color: 'rgba(215, 95, 160, 1)',
      fontFamily: 'Roboto-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  rootErrorLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '15px',
    fontFamily: 'Roboto-Regular',
    '&$errorLabel': {
      color: 'rgba(176, 0, 32, 1)',
      fontFamily: 'Roboto-Regular',
      transform: 'translate(10px,12px) scale(0.73)',
    },
  },
  focusedLabel: {},
  errorLabel: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '321px',
    height: '54.82px',
  },
});

class Password extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      classes,
      children,
      onChange,
      isError,
      password,
      errorMessage,
      label,
      ...otherProps
    } = this.props;
    const { showPassword } = this.state;
    const rootLabelClassNames = classNames({
      [classes.rootErrorLabel]: isError,
      [classes.rootLabel]: !isError,
    });
    return (
      <div>
        <TextField
          {...otherProps}
          className={classes.textField}
          error={isError}
          variant="filled"
          type={showPassword ? 'text' : 'password'}
          label={label}
          value={password}
          onChange={onChange('password')}
          helperText={errorMessage}
          FormHelperTextProps={{
            classes: {
              root: classes.helperText,
              error: classes.helperTextError,
            },
          }}
          InputLabelProps={{
            classes: {
              root: rootLabelClassNames,
              focused: classes.focusedLabel,
              error: classes.errorLabel,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? (
                    <Visibility style={{ color: 'rgba(215, 95, 160, 1)' }} />
                  ) : (
                    <Visibility style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            classes: {
              root: classes.inputRoot,
              underline: isError ? classes.inputErrorUnderline : classes.inputUnderline,
              error: classes.inputError,
            },
          }}
        />
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Password);
