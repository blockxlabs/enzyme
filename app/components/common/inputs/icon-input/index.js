import React, { Component } from 'react';
import classNames from 'classnames';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class IconInput extends Component {
  render() {
    const {
      icon, error, containerStyle, ...otherProps
    } = this.props;

    const walletIconInputClassName = classNames({
      'icon-input-grid-container': true,
      'icon-input-grid-container-error': error,
    });

    const walletIconHiddenInputClassName = classNames({
      'wallet-icon-hidden-input': true,
      'wallet-icon-hidden-input-error': error,
    });

    const iconColor = '#648c9e';

    return (
      <div className={walletIconInputClassName} style={containerStyle}>
        <div className="icon-input-grid-icon">
          <div className="icon-input-grid-icon-background">
            <FontAwesomeIcon
              icon={icon}
              style={{
                color: iconColor,
                height: 15,
                width: 15,
              }}
            />
          </div>
        </div>
        <div className="icon-input-grid-text-input">
          <input className={walletIconHiddenInputClassName} {...otherProps} />
        </div>
      </div>
    );
  }
}
