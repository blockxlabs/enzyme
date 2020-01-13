import React, { Component } from 'react';
import GenerateSeedPhrase from '../generate-seed-phrase';
import ImportSeedPhrase from '../import-seed-phrase';
import ConfirmSeedPhrase from '../confirm-seed-phrase';
import * as Account from '../../../constants/account';

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
      confirmSeedPhraseInputName,
      seedRef,
      confirmSeedRef,
      handleSeedWordsOnBlur,
      handleConfirmSeedWordsOnBlur,
      confirmedSeedWords,
      alias,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {value === Account.CREATE_ACCOUNT && <GenerateSeedPhrase seedWords={generatedSeedWords} />}
        {value === Account.IMPORT_ACCOUNT && (
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
        {value === Account.CONFIRM_ACCOUNT && (
          <ConfirmSeedPhrase
            alias={alias}
            onChange={onChange}
            seedWords={confirmedSeedWords}
            isError={isError}
            errorMessage={errorMessage}
            handleSeedWordConfirmOnMount={handleSeedWordImportOnMount}
            confirmSeedPhraseInputName={confirmSeedPhraseInputName}
            confirmSeedRef={confirmSeedRef}
            handleConfirmSeedWordsOnBlur={handleConfirmSeedWordsOnBlur}
          />
        )}
      </div>
    );
  }
}
