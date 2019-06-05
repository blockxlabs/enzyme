import React, { Component } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class DropDown extends Component {
  render() {
    const {
      classes, options, value, onChange
    } = this.props;
    return (
      <div>
        <NativeSelect
          className={classes.test}
          classes={{
            root: classes.root,
            select: classes.select,
            icon: classes.icon,
          }}
          onChange={onChange}
          value={value.value}
          disableUnderline
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </NativeSelect>
      </div>
    );
  }
}

export default withStyles(styles)(DropDown);
