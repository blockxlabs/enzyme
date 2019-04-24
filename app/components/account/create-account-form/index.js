import React, { Component } from 'react';
import GenerateSeedWordForm from '../generate-seed-word-form';
import ImportSeedPhraseForm from '../import-seed-phrase-form';

export default class CreateAccountForm extends Component {
  render() {
    const {
      value,
      generatedSeedWords,
      generateButtonName,
      importButtonName,
      onGenerateClick,
      onImportClick,
      onChange,
      importedSeedWords,
      isError,
      errorMessage,
      handleSeedWordImportOnMount,
      onBlur,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {value === 0 && (
          <GenerateSeedWordForm
            seedWords={generatedSeedWords}
            onClick={onGenerateClick}
            buttonName={generateButtonName}
          />
        )}
        {value === 1 && (
          <ImportSeedPhraseForm
            onChange={onChange}
            onClick={onImportClick}
            buttonName={importButtonName}
            seedWords={importedSeedWords}
            isError={isError}
            errorMessage={errorMessage}
            handleSeedWordImportOnMount={handleSeedWordImportOnMount}
            onBlur={onBlur}
          />
        )}
      </div>
    );
  }
}
