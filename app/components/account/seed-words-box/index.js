import React, { Component } from 'react';
import MultilineInput from '../../common/multiline-input';

export default class SeedWordsBox extends Component {
  render() {
    const { value, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <MultilineInput value={value} />
      </div>
    );
  }
}
