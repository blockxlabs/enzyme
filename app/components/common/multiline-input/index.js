import React, { PureComponent } from 'react';
import './styles.css';
import classNames from 'classnames';

export default class MultilineInput extends PureComponent {
  render() {
    const {
      width, height, error, errorText, value, onChange, ...otherProps
    } = this.props;

    const walletInputClassNames = classNames({
      'wallet-multiline-input': true,
      'wallet-multiline-error': error,
    });

    return (
      <div
        style={{ height, width }}
        className={walletInputClassNames}
        onChange={onChange}
        {...otherProps}
      >
        {value}
      </div>
    );
  }
}
