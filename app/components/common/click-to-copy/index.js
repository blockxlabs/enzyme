import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontRegular from '../fonts/font-regular';

export default class ClickToCopy extends Component {
  render() {
    const {
      value, text, onCopy, ...otherProps
    } = this.props;
    return (
      <CopyToClipboard text={value} onCopy={onCopy}>
        <FontRegular {...otherProps} text={text} />
      </CopyToClipboard>
    );
  }
}
