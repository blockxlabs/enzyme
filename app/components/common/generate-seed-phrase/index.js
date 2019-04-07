import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MultilineInput from '../multiline-input';
import './styles.css';

export default class GenerateSeedPhrase extends Component {
  render() {
    const { seedWords } = this.props;
    return (
      <div className="seed-phrase-container">
        <div className="seed-phrase-title">Generate Seed Phrase</div>
        <div className="seed-phrase-description">
          This seed phrase is used to generate your first account. Save this somewhere safe and
          don&#39;t share it.
        </div>
        <div className="seed-phrase-text-area">
          <MultilineInput>{seedWords}</MultilineInput>
        </div>
        <CopyToClipboard text={seedWords}>
          <div className="seed-phrase-copy">Click to copy</div>
        </CopyToClipboard>
      </div>
    );
  }
}
