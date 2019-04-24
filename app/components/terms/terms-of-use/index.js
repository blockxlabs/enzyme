import React, { Component } from 'react';
import TermsText from '../../../views/terms/terms-text';

export default class TermsOfUse extends Component {
  render() {
    const { ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <TermsText />
      </div>
    );
  }
}
