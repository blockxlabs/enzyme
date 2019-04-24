import React, { Component } from 'react';
import GenerateSeedPhrase from '../generate-seed-phrase';
import FooterButton from '../../common/footer-button';

export default class GenerateSeedWordForm extends Component {
  render() {
    const { seedWords, onClick, buttonName } = this.props;
    return (
      <div>
        <GenerateSeedPhrase seedWords={seedWords} />
        <FooterButton onClick={onClick} name={buttonName} />
      </div>
    );
  }
}
