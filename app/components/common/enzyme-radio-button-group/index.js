import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class EnzymeRadioButtonGroup extends Component {
  render() {
    const {
      classes, options, value, onChange, disabled, ...otherProps
    } = this.props;
    return (
      <RadioGroup
        onChange={onChange}
        classes={{ root: classes.radioGroupRoot }}
        value={value.value}
        {...otherProps}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={(
              <Radio
                classes={{
                  colorSecondary: classes.colorSecondary,
                  checked: classes.checked,
                  root: classes.radioRoot,
                }}
              />
            )}
            label={option.text}
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    );
  }
}

export default withStyles(styles)(EnzymeRadioButtonGroup);
