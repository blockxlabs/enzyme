import React, { Component } from 'react';
import ImportSeedPhrase from '../import-seed-phrase';
import FooterButton from '../../common/footer-button';

export default class ImportSeedPhraseForm extends Component {
  render() {
    const {
      onChange,
      onClick,
      buttonName,
      seedWords,
      isError,
      errorMessage,
      handleSeedWordImportOnMount,
      onBlur,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ImportSeedPhrase
          onChange={onChange}
          seedWords={seedWords}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={handleSeedWordImportOnMount}
          onBlur={onBlur}
        />
        <FooterButton onClick={onClick} name={buttonName} />
      </div>
    );
  }
}
