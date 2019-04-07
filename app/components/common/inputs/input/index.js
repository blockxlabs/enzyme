import React, { PureComponent } from 'react';
import classNames from 'classnames';
import '../common-styles.css';

export default class Input extends PureComponent {
  render() {
    const {
      error, errorText, value, onChange, ...otherProps
    } = this.props;

    const walletInputClassName = classNames({
      'wallet-input': true,
      'wallet-input-error': error,
      'wallet-input-readonly': this.props.readOnly,
    });

    return (
      <input className={walletInputClassName} value={value} onChange={onChange} {...otherProps} />
    );
  }
}
