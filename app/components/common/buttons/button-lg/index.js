import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import './styles.css';

class ButtonLG extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { className, ...otherProps } = this.props;
    const buttonLGClassNames = classNames({
      'button-lg': true,
    });
    return (
      <div className={buttonLGClassNames}>
        <Button disabled={this.props.disabled} onClick={this.props.onClick} {...otherProps}>
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonLG;
