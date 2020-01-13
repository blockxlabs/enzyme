import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './styles.css';

class ButtonSM extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'dashboard']),
  };

  static defaultProps = {
    disabled: false,
    color: 'primary',
  };

  render() {
    const { className, color, ...otherProps } = this.props;
    const buttonMDClassNames = classNames({
      [`button-sm-${color}`]: true,
    });

    return (
      <div className={buttonMDClassNames}>
        <Button disabled={this.props.disabled} onClick={this.props.onClick} {...otherProps}>
          {color === 'dashboard' && <AddIcon className="icon-spacing" />}
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonSM;
