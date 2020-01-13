import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class WalletExpansionPanel extends Component {
  render() {
    const {
      classes,
      summary,
      children,
      handleChange,
      expanded,
      isBelowExpandIcon,
      ...otherProps
    } = this.props;
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={handleChange}
        classes={{ root: classes.root, expanded: classes.panelExpanded }}
        {...otherProps}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            content: classes.content,
            expanded: classes.expanded,
            root: classes.summaryRoot,
            expandIcon: isBelowExpandIcon ? classes.belowExpandIcon : classes.expandIcon,
          }}
          // eslint-disable-next-line react/no-children-prop
          children={summary}
        />
        <ExpansionPanelDetails
          classes={{ root: classes.detailsRoot }}
          // eslint-disable-next-line react/no-children-prop
          children={children}
        />
      </ExpansionPanel>
    );
  }
}

WalletExpansionPanel.defaultProps = {
  expanded: true,
};

WalletExpansionPanel.propTypes = {
  expanded: PropTypes.bool,
};

export default withStyles(styles)(WalletExpansionPanel);
