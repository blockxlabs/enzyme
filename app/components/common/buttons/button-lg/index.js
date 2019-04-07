import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import './styles.css';

class ButtonLG extends Component {
  static defaultProps = {
    disabled: false,
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const buttonLGClassNames = classNames({
      'button-lg': true,
      'button-lg-enabled': !this.props.disabled,
      'wallet-button-disabled': this.props.disabled,
    });
    return (
      <div>
        <button
          type="button"
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          className={buttonLGClassNames}
          style={this.props.style}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default ButtonLG;
