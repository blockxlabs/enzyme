import React, { Component } from 'react';
import ContentHeader from '../../common/content-header';
import EnzymeMultilineInput from '../../common/enzyme-multiline-input';
import './styles.css';

export default class ImportSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.seedWordsInput = React.createRef();
  }

  componentDidMount() {
    this.props.handleSeedWordImportOnMount();
  }

  render() {
    const {
      onChange,
      seedWords,
      isError,
      errorMessage,
      importSeedPhraseInputName,
      seedRef,
      handleSeedWordsOnBlur,
    } = this.props;
    return (
      <div>
        <ContentHeader
          title="Import Seed Phrase"
          description="This seed phrase is used to generate your first account. Make sure it's saved somewhere safe and don't share it."
        />
        <EnzymeMultilineInput
          className="import-seed-phrase-input"
          placeholder="Type or paste your seed phrase..."
          error={isError}
          helperText={errorMessage}
          onChange={onChange(importSeedPhraseInputName)}
          value={seedWords}
          name={importSeedPhraseInputName}
          inputRef={seedRef}
          onBlur={handleSeedWordsOnBlur}
        />
      </div>
    );
  }
}
