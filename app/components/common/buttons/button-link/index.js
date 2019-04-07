import React, { PureComponent } from 'react';
import './styles.css';

export default class ButtonLink extends PureComponent {
  render() {
    return (
      <a className="wallet-button-link" onClick={this.props.onClick} {...this.props}>
        {this.props.children}
      </a>
    );
  }
}
