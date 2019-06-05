import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import CreateAccountForm from '../../components/account/create-account-form';
import EnzymeTabs from '../../components/common/enzyme-tabs';
import CreateAccountSettings from '../../components/account/create-account-settings';
import FooterButton from '../../components/common/footer-button';
import './styles.css';

const TO_DASHBOARD_BUTTON_TEXT = 'dashboard';
const IMPORT_BUTTON_TEXT = 'import';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      buttonName: TO_DASHBOARD_BUTTON_TEXT,
      onSubmit: this.handleClick,
      importedSeedPhrase: '',
      isError: false,
      errorMessage: null,
      labels: ['generate', 'import'],
      keypairType: props.keypairType,
      alias: '',
      isAliasError: false,
      aliasErrorMessage: null,
      importSeedPhraseInputName: 'importedSeedPhrase',
      aliasInputName: 'alias',
    };
    this.validator = new EnzymeValidator(validator.importSeedPhraseValidation);
    this.aliasValidator = new EnzymeValidator(validator.aliasValidation);
    this.aliasInput = React.createRef();
    this.seedInput = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { isError: true, errorMessage: props.error.message };
    }
    if (props.success) {
      props.updateAppLoading(true);
      props.setAndStartOnBoarding();
    }
    return state;
  }

  handleChange = (e, value) => {
    let { buttonName, onSubmit } = this.state;
    if (value === 0) {
      buttonName = TO_DASHBOARD_BUTTON_TEXT;
      onSubmit = this.handleClick;
    }
    if (value === 1) {
      buttonName = IMPORT_BUTTON_TEXT;
      onSubmit = this.handleImportSeedWordClick;
    }
    this.setState({ value, buttonName, onSubmit });
  };

  handleImportSeedWordsChange = prop => e => {
    let { value } = e.target;
    let { isError, errorMessage } = this.state;
    const { error, resetImportAccountWithSeedPhraseError } = this.props;
    value = value.trim().replace(/\n/g, ' ');
    if (error) {
      resetImportAccountWithSeedPhraseError();
    }
    if (value === '') {
      isError = false;
      errorMessage = null;
    }
    this.setState({
      [prop]: value,
      isError,
      errorMessage,
    });
  };

  handleAliasChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  handleSeedWordImportOnMount = () => {
    this.setState({
      importedSeedPhrase: '',
    });
  };

  handleClick = () => {
    const { keypairType, alias } = this.state;
    const { isAliasError, aliasErrorMessage } = this.validateAlias(alias);
    if (isAliasError) {
      this.aliasInput.focus();
    } else if ((keypairType !== this.props.keypairType || alias !== '') && !isAliasError) {
      this.props.createFirstAccountWithSeedPhrase(this.props.account.seedWords, alias);
    } else {
      this.props.createFirstAccountWithSeedPhraseSuccess();
    }
    this.setState({ isAliasError, aliasErrorMessage, alias });
  };

  handleImportSeedWordClick = () => {
    const { alias, importedSeedPhrase } = this.state;
    const { isAliasError, aliasErrorMessage } = this.validateAlias(alias);
    const { isError, errorMessage } = this.validateSeedPhrase(importedSeedPhrase);
    if (!isError && !isAliasError) {
      this.props.createFirstAccountWithSeedPhrase(this.state.importedSeedPhrase, this.state.alias);
    } else if (isError) {
      this.seedInput.focus();
    } else if (alias !== '' && isAliasError) {
      this.aliasInput.focus();
    }
    this.setState({
      isAliasError,
      aliasErrorMessage,
      isError,
      errorMessage,
    });
  };

  onKeypairTypeChange = e => {
    this.props.setKeypairType(e.target.value);
  };

  handleAliasOnBlur = () => {
    const { isAliasError, aliasErrorMessage } = this.validateAlias(this.state.alias);
    if (this.state.alias === '' || !isAliasError) {
      this.setState({
        isAliasError,
        aliasErrorMessage,
      });
    }
  };

  handleSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.importedSeedPhrase);
    if (this.state.importedSeedPhrase === '' || !isError) {
      this.setState({ isError, errorMessage });
    }
  };

  validateAlias(alias) {
    let { isAliasError, aliasErrorMessage } = this.state;
    if (alias !== '') {
      const aliasValidation = this.aliasValidator.validate({
        alias,
      });
      if (!aliasValidation.isValid) {
        isAliasError = true;
        aliasErrorMessage = aliasValidation.alias.message;
      } else {
        isAliasError = false;
        aliasErrorMessage = null;
      }
    } else {
      isAliasError = false;
      aliasErrorMessage = null;
    }
    return {
      isAliasError,
      aliasErrorMessage,
    };
  }

  validateSeedPhrase(importedSeedPhrase) {
    let { isError, errorMessage } = this.state;
    const validation = this.validator.validate({
      seedPhrase: importedSeedPhrase,
    });
    if (!validation.isValid) {
      isError = true;
      errorMessage = validation.seedPhrase.message;
    } else {
      isError = false;
      errorMessage = null;
    }

    return {
      isError,
      errorMessage,
    };
  }

  render() {
    const {
      account: { seedWords },
      keypairType,
      keypairTypes,
    } = this.props;
    const {
      value,
      buttonName,
      onSubmit,
      importedSeedPhrase,
      isError,
      errorMessage,
      isAliasError,
      aliasErrorMessage,
      labels,
      alias,
      importSeedPhraseInputName,
      aliasInputName,
    } = this.state;

    return (
      <div>
        <EnzymeTabs value={value} onChange={this.handleChange} labels={labels} />
        <CreateAccountForm
          value={value}
          generatedSeedWords={seedWords}
          importedSeedWords={importedSeedPhrase}
          onChange={this.handleImportSeedWordsChange}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
          importSeedPhraseInputName={importSeedPhraseInputName}
          seedRef={input => {
            this.seedInput = input;
          }}
          handleSeedWordsOnBlur={this.handleSeedWordsOnBlur}
          className="create-account-form"
        />
        <CreateAccountSettings
          alias={alias}
          handleAliasChange={this.handleAliasChange}
          aliasPropName="alias"
          aliasLabel="Nickname"
          isAliasError={isAliasError}
          aliasErrorMessage={aliasErrorMessage}
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={this.onKeypairTypeChange}
          aliasInputName={aliasInputName}
          aliasRef={input => {
            this.aliasInput = input;
          }}
          handleAliasOnBlur={this.handleAliasOnBlur}
          className="create-account-settings"
        />
        <FooterButton onClick={onSubmit} name={buttonName} />
      </div>
    );
  }
}

CreateAccount.defaultProps = {
  seedWords: '',
  createFirstAccountWithSeedPhrase: undefined,
  error: null,
  resetImportAccountWithSeedPhraseError: undefined,
  createFirstAccountWithSeedPhraseSuccess: undefined,
};

CreateAccount.propTypes = {
  createFirstAccountWithSeedPhrase: PropTypes.func,
  error: PropTypes.string,
  resetImportAccountWithSeedPhraseError: PropTypes.func,
  seedWords: PropTypes.string,
  createFirstAccountWithSeedPhraseSuccess: PropTypes.func,
};
