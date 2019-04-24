import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import CreateAccountForm from '../../components/account/create-account-form';
import EnzymeTabs from '../../components/common/enzyme-tabs';

const TO_DASHBOARD_BUTTON_TEXT = 'dashboard';
const IMPORT_BUTTON_TEXT = 'import';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      importedSeedPhrase: '',
      isError: false,
      errorMessage: '',
      labels: ['generate', 'import'],
    };
    this.validator = new EnzymeValidator(validator.importSeedPhraseValidation);
  }

  handleChange = (e, value) => {
    this.setState({ value });
  };

  handleImportSeedWordsChange = prop => e => {
    let { isError, errorMessage } = this.state;
    const { error, resetImportAccountWithSeedPhraseError } = this.props;
    if (error) {
      resetImportAccountWithSeedPhraseError();
    }
    if (e.target.value === '') {
      isError = false;
      errorMessage = '';
    }
    this.setState({
      [prop]: e.target.value,
      isError,
      errorMessage,
    });
  };

  handleSeedWordImportOnMount = () => {
    this.setState({
      importedSeedPhrase: '',
      isError: false,
      errorMessage: '',
    });
  };

  handleClick = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleImportSeedWordClick = () => {
    const { importedSeedPhrase } = this.state;
    const { createFirstAccountWithSeedPhrase } = this.props;
    let { errorMessage, isError } = this.state;
    const validation = this.validator.validate({
      seedPhrase: importedSeedPhrase,
    });
    if (!validation.isValid) {
      isError = true;
      errorMessage = validation.seedPhrase.message;
      this.setState({
        isError,
        errorMessage,
      });
      return;
    }
    createFirstAccountWithSeedPhrase(importedSeedPhrase);
  };

  handleSeedWordsImportOnBlur = ref => () => {
    const { importedSeedPhrase } = this.state;
    let { errorMessage, isError } = this.state;
    if (importedSeedPhrase === '') {
      return;
    }
    const validation = this.validator.validate({
      seedPhrase: importedSeedPhrase,
    });
    if (!validation.isValid) {
      isError = true;
      errorMessage = validation.seedPhrase.message;
    }
    this.setState({
      isError,
      errorMessage,
    });
    ref.focus();
  };

  render() {
    const { seedWords } = this.props;
    const {
      value, importedSeedPhrase, isError, errorMessage, labels
    } = this.state;

    return (
      <div>
        <EnzymeTabs value={value} onChange={this.handleChange} labels={labels} />
        <CreateAccountForm
          value={value}
          generatedSeedWords={seedWords}
          importedSeedWords={importedSeedPhrase}
          onGenerateClick={this.handleClick}
          onImportClick={this.handleImportSeedWordClick}
          generateButtonName={TO_DASHBOARD_BUTTON_TEXT}
          importButtonName={IMPORT_BUTTON_TEXT}
          onChange={this.handleImportSeedWordsChange}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
          onBlur={this.handleSeedWordsImportOnBlur}
        />
      </div>
    );
  }
}

CreateAccount.defaultProps = {
  seedWords: '',
  createFirstAccountWithSeedPhrase: undefined,
  error: null,
  resetImportAccountWithSeedPhraseError: undefined,
  changePage: undefined,
};

CreateAccount.propTypes = {
  seedWords: PropTypes.string,
  createFirstAccountWithSeedPhrase: PropTypes.func,
  error: PropTypes.string,
  resetImportAccountWithSeedPhraseError: PropTypes.func,
  changePage: PropTypes.func,
};

CreateAccount.getDerivedStateFromProps = (props, state) => {
  let { isError, errorMessage } = state;
  if (props.error) {
    isError = true;
    errorMessage = props.error.message;
  }
  return { isError, errorMessage };
};
