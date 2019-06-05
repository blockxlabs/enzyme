import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class EnzymeTabs extends Component {
  render() {
    const {
      value, onChange, classes, labels, ...otherProps
    } = this.props;
    return (
      <Tabs
        value={value}
        onChange={onChange}
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        {...otherProps}
      >
        {labels.map(label => (
          <Tab
            key={label}
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={label}
          />
        ))}
      </Tabs>
    );
  }
}

export default withStyles(styles)(EnzymeTabs);
