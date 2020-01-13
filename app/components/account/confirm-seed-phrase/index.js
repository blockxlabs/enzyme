import React, { Component } from 'react';
import ContentHeader from '../../common/content-header';
import EnzymeMultilineInput from '../../common/enzyme-multiline-input';
import './styles.css';

export default class ConfirmSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.seedWordsInput = React.createRef();
  }

  componentDidMount() {
    this.props.handleSeedWordConfirmOnMount();
  }

  render() {
    const {
      onChange,
      seedWords,
      isError,
      errorMessage,
      confirmSeedPhraseInputName,
      confirmSeedRef,
      handleConfirmSeedWordsOnBlur,
      alias,
    } = this.props;

    return (
      <div>
        <ContentHeader
          title="Verify Seed Phrase"
          description="Type or paste your seed phrase here to verify that you've saved it."
        />
        <EnzymeMultilineInput
          className="confirm-seed-phrase-input"
          placeholder={`Confirm seed phrase was used to generate your ${alias} account`}
          error={isError}
          helperText={errorMessage}
          onChange={onChange(confirmSeedPhraseInputName)}
          value={seedWords}
          name={confirmSeedPhraseInputName}
          inputRef={confirmSeedRef}
          onBlur={handleConfirmSeedWordsOnBlur}
        />
      </div>
    );
  }
}
