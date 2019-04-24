import React, { Component } from 'react';
import FontMedium from '../fonts/font-medium';
import IconContainer from '../icon-container';
import './styles.css';

export default class SubHeader extends Component {
  render() {
    const { icon } = this.props;
    return (
      <div className="sub-header-container sub-header-shadow">
        <IconContainer
          className="sub-header-icon clickable-icon"
          onClick={this.props.backBtnOnClick}
        >
          {icon}
        </IconContainer>
        <FontMedium className="sub-header-title" text={this.props.title} />
      </div>
    );
  }
}
