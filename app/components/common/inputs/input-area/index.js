import React, { PureComponent } from 'react';
import classNames from 'classnames';
import '../common-styles.css';

export default class InputArea extends PureComponent {
  render() {
    const {
      error, errorText, value, onChange, ...otherProps
    } = this.props;

    const walletInputClassName = classNames({
      'wallet-input-area': true,
      'wallet-input-area-error': error,
    });

    return (
      <textarea
        className={walletInputClassName}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    );
  }
}
