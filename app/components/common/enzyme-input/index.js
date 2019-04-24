import React, { Component } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { styles } from './styles';

class EnzymeInput extends Component {
  render() {
    const {
      classes, helperText, error, InputProps, ...otherProps
    } = this.props;
    const rootLabelClassNames = classNames({
      [classes.rootErrorLabel]: error,
      [classes.rootLabel]: !error,
    });
    return (
      <TextField
        {...otherProps}
        error={error}
        helperText={helperText}
        variant="filled"
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
          classes: {
            root: classes.inputRoot,
            underline: error ? classes.inputErrorUnderline : classes.inputUnderline,
            error: classes.inputError,
            input: classes.input,
          },
          ...InputProps,
        }}
      />
    );
  }
}

export default withStyles(styles)(EnzymeInput);
