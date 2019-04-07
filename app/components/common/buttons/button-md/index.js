import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import '../styles.css';

class ButtonMD extends Component {
  static defaultProps = {
    disabled: false,
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const buttonMDClassNames = classNames({
      'button-md': true,
      'button-md-enabled': !this.props.disabled,
      'wallet-button-disabled': this.props.disabled,
    });
    return (
      <div>
        <button
          type="button"
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          className={buttonMDClassNames}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default ButtonMD;
