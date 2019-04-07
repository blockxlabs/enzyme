import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import '../styles.css';

class ButtonXS extends Component {
  static defaultProps = {
    disabled: false,
  };

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { color, ...otherProps } = this.props;

    const buttonSMClassNames = classNames({
      'button-xs': true,
      'wallet-button-color-transition ': true,
      'wallet-button-disabled': this.props.disabled,
    });
    return (
      <div>
        <button type="button" className={buttonSMClassNames} {...otherProps}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default ButtonXS;
