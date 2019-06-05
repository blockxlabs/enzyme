import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import FontRegular from '../fonts/font-regular';
import { styles } from './styles';

class EnzymeExpansionPanel extends Component {
  state = {
    expanded: false,
  };

  handleChange = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  };

  render() {
    const { expanded } = this.state;
    const {
      classes, title, children, ...otherProps
    } = this.props;
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.handleChange}
        classes={{ root: classes.root, expanded: classes.panelExpanded }}
        {...otherProps}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            content: classes.content,
            expanded: classes.expanded,
            root: classes.summaryRoot,
            expandIcon: classes.expandIcon,
          }}
          // eslint-disable-next-line react/no-children-prop
          children={<FontRegular text={title} style={{ fontSize: 14, fontWeight: 'bolder' }} />}
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

export default withStyles(styles)(EnzymeExpansionPanel);
