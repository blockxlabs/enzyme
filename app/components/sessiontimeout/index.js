import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Libraries
import Animated from 'animated/lib/targets/react-dom';
import classNames from 'classnames';

// Import Components
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { IconStopwatch } from '../common/icon';
import ButtonXS from '../common/buttons/button-xs';
import FontRegular from '../common/fonts/font-regular';
import IconInput from '../common/inputs/icon-input';
import FontError from '../common/fonts/font-error';

// Import Actions and Services
import { createToast } from '../../constants/toast';
import { setTimeout } from '../../actions/initialize';

import {
  SESSION_TIMEOUT_HEIGHT,
  SESSION_TIMEOUT_ITEM,
  settingsItemAnimatedMap,
  settingsItemHighlightMap,
} from '../../constants/animation';

import {
  shrinkSettingItems,
  animateSettingItemIn,
  animateSettingItemOut,
  unhighlightSettingItems,
  highlightSettingItems,
} from '../../services/animationService';

// Import Validation Object and rules
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
// Import Styles
import './styles.css';

function mapStateToProps(state) {
  return {
    pageStatus: state.appState.pageStatus,
    showSettings: state.animationReducer.showSettings,
    sessionTimeout: state.appState.timeout,
  };
}

const sessiontTimeoutInputHeight = settingsItemAnimatedMap.get(SESSION_TIMEOUT_ITEM);

class SessionTimeout extends Component {
  constructor(props, context) {
    super(props, context);

    // Declare Validator as well as Wallet variables
    this.validator = new EnzymeValidator(validator.sessionTimeout);

    this.state = {
      timeout: '',
      validation: undefined,
      highlightContainer: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.showSettings === false) {
      Animated.timing(sessiontTimeoutInputHeight, {
        toValue: 0,
      }).start();
    }
    return null;
  }

  handelOnChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handelSessiontimeout = () => {
    // Return if Validation is incorrect
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    if (!validation.isValid) return;

    try {
      this.props.setTimeout(this.state.timeout);
      this.props.createToast({
        message: 'Session timeout was successfully changed.',
        type: 'success',
      });

      highlightSettingItems();
      animateSettingItemOut(sessiontTimeoutInputHeight);
    } catch (error) {
      this.props.createToast({
        message: 'Session timeout was not changed. Please try again.',
        type: 'error',
      });
    }
  };

  toggleSessionTimeoutAnimation = () => {
    // Unhighlight Item
    unhighlightSettingItems(SESSION_TIMEOUT_ITEM);
    this.handleContainerMouseEnter();

    // Shrink Other setting Items
    shrinkSettingItems(SESSION_TIMEOUT_ITEM);
    // Expand Input
    animateSettingItemIn(sessiontTimeoutInputHeight, SESSION_TIMEOUT_HEIGHT);
    // Reset State
    if (this.props.sessionTimeout === 99999999000) {
      this.setState({ error: false, timeout: 0 });
    } else {
      this.setState({
        error: false,
        timeout: this.props.sessionTimeout / 1000,
      });
    }
  };

  handleContainerMouseEnter = () => {
    let highlightContainer = true;

    if (settingsItemHighlightMap.get(SESSION_TIMEOUT_ITEM)) {
      highlightContainer = false;
    }

    this.setState({
      highlightContainer,
    });
  };

  handleContainerMouseLeave = () => {
    this.setState({ highlightContainer: false });
  };

  render() {
    const {
      error, validation, highlightContainer, timeout
    } = this.state;

    const containerClassName = classNames({
      [this.props.className]: true,
      [`${this.props.className}-highlighted`]: highlightContainer,
    });

    return (
      <div
        className={containerClassName}
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}
      >
        <div
          className="settings-session-timeout-label"
          onClick={this.toggleSessionTimeoutAnimation}
        >
          <IconStopwatch className="settings-icon" />
          <FontRegular className="settings-title">Session Timeout</FontRegular>
        </div>

        <Animated.div
          className="settings-session-timeout-content"
          style={{
            height: sessiontTimeoutInputHeight,
            overflow: 'hidden',
          }}
        >
          <div className="settings-session-timeout-input">
            <IconInput
              name="timeout"
              error={error}
              icon={faStopwatch}
              placeholder="Enter in second"
              onChange={this.handelOnChange}
              value={timeout}
            />

            <FontError>{validation === undefined ? ' ' : validation.timeout.message}</FontError>
          </div>
          <div className="settings-session-timeout-button">
            <ButtonXS onClick={this.handelSessiontimeout}>Save</ButtonXS>
          </div>
          <div className="settings-export-padding" />
        </Animated.div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createToast: toastOptions => dispatch(createToast(toastOptions)),
    setTimeout: period => dispatch(setTimeout(period)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionTimeout);
