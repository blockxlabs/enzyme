import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { styles } from './styles';

class EnzymeInput extends Component {
  render() {
    const {
      classes,
      helperText,
      error,
      InputProps,
      inputStyles,
      withWhiteColor,
      ...otherProps
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
            input: withWhiteColor ? classes.inputWithWhiteColor : classes.input,
          },
          ...InputProps,
        }}
        //eslint-disable-next-line
        inputProps={{
          ...inputStyles,
        }}
      />
    );
  }
}

export default withStyles(styles)(EnzymeInput);
