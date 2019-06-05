import React, { Component } from 'react';
import GenerateSeedPhrase from '../generate-seed-phrase';
import ImportSeedPhrase from '../import-seed-phrase';

export default class CreateAccountForm extends Component {
  render() {
    const {
      value,
      generatedSeedWords,
      onChange,
      importedSeedWords,
      isError,
      errorMessage,
      handleSeedWordImportOnMount,
      importSeedPhraseInputName,
      seedRef,
      handleSeedWordsOnBlur,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {value === 0 && <GenerateSeedPhrase seedWords={generatedSeedWords} />}
        {value === 1 && (
          <ImportSeedPhrase
            onChange={onChange}
            seedWords={importedSeedWords}
            isError={isError}
            errorMessage={errorMessage}
            handleSeedWordImportOnMount={handleSeedWordImportOnMount}
            importSeedPhraseInputName={importSeedPhraseInputName}
            seedRef={seedRef}
            handleSeedWordsOnBlur={handleSeedWordsOnBlur}
          />
        )}
      </div>
    );
  }
}
