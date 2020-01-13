import React, { Component } from 'react';
import FontMedium from '../fonts/font-medium';
import IconContainer from '../icon-container';
import { MoreVertIcon } from '../icon';
import EnzymeMenu from '../enzyme-menu';
import './styles.css';

export default class SubHeader extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { icon, subMenu, onSubMenuOptionsChange } = this.props;
    return (
      <div className="sub-header-container sub-header-shadow">
        <IconContainer
          className="sub-header-icon clickable-icon"
          onClick={this.props.backBtnOnClick}
        >
          {icon}
        </IconContainer>
        <FontMedium className="sub-header-title" text={this.props.title} />
        {subMenu && subMenu.length > 0 && (
          <div>
            <MoreVertIcon onClick={this.handleClick} className="more-list-icon" />
            <EnzymeMenu
              options={subMenu}
              onChange={option => {
                onSubMenuOptionsChange(option);
              }}
              anchorEl={anchorEl}
              onClose={this.handleClose}
            />
          </div>
        )}
      </div>
    );
  }
}
