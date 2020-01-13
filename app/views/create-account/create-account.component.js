import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import CreateAccountForm from '../../components/account/create-account-form';
import EnzymeTabs from '../../components/common/enzyme-tabs';
import { MANAGE_ACCOUNT_PAGE } from '../../constants/navigation';
import CreateAccountSettings from '../../components/account/create-account-settings';
import FooterButton from '../../components/common/footer-button';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import * as Account from '../../constants/account';
import './styles.css';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Account.CREATE_ACCOUNT,
      formValue: Account.CREATE_ACCOUNT,
      buttonName: Account.TO_CONFIRM_BUTTON_TEXT,
      backButtonName: Account.BACK_BUTTON_TEXT,
      onSubmit: this.handleNext,
      importedSeedPhrase: '',
      confirmSeedPhrase: '',
      isError: false,
      errorMessage: null,
      labels: ['generate', 'import'],
      alias: '',
      disableAccountSettings: false,
      isAliasError: false,
      aliasErrorMessage: null,
      importSeedPhraseInputName: 'importedSeedPhrase',
      confirmSeedPhraseInputName: 'confirmSeedPhrase',
      aliasInputName: 'alias',
    };
    this.validator = new EnzymeValidator(validator.importSeedPhraseValidation);
    this.aliasValidator = new EnzymeValidator(validator.aliasValidation);
    this.aliasInput = React.createRef();
    this.seedInput = React.createRef();
    this.confirmSeedInput = React.createRef();
  }

  componentDidMount() {
    const { aliasError, resetImportAccountWithSeedPhraseError } = this.props;
    if (aliasError) {
      resetImportAccountWithSeedPhraseError();
      this.setState({
        isAliasError: false,
        aliasErrorMessage: null,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { isError: true, errorMessage: props.error.message };
    }
    if (props.aliasError) {
      return { isAliasError: true, aliasErrorMessage: 'Duplicate alias.' };
    }
    return state;
  }

  handleChange = (e, value) => {
    let {
      buttonName, formValue, onSubmit, disableAccountSettings
    } = this.state;
    if (value === Account.CREATE_ACCOUNT) {
      buttonName = Account.TO_CONFIRM_BUTTON_TEXT;
      onSubmit = this.handleNext;
      formValue = Account.CREATE_ACCOUNT;
      disableAccountSettings = false;
    }
    if (value === Account.IMPORT_ACCOUNT) {
      buttonName = Account.IMPORT_BUTTON_TEXT;
      onSubmit = this.handleImportSeedWordClick;
      formValue = Account.IMPORT_ACCOUNT;
      disableAccountSettings = false;
    }
    this.setState({
      value,
      buttonName,
      formValue,
      onSubmit,
      disableAccountSettings,
    });
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

  handelBack = () => {
    if (
      this.state.formValue === Account.CREATE_ACCOUNT
      || this.state.formValue === Account.IMPORT_ACCOUNT
    ) {
      this.props.changePage(MANAGE_ACCOUNT_PAGE);
    } else if (this.state.formValue === Account.CONFIRM_ACCOUNT) {
      this.setState({
        buttonName: Account.TO_CONFIRM_BUTTON_TEXT,
        onSubmit: this.handleNext,
        formValue: Account.CREATE_ACCOUNT,
        disableAccountSettings: false,
      });
    }
  };

  handelConfirm = () => {
    const { confirmSeedPhrase, alias } = this.state;
    const { seedWords } = this.props;
    const trimedSeedWords = seedWords.replace(/\s/g, '');
    const trimedConfirmSeedPhrase = confirmSeedPhrase.replace(/\s/g, '');
    if (trimedSeedWords === trimedConfirmSeedPhrase) {
      this.props.createFirstAccountWithSeedPhrase(this.props.seedWords, alias);
    } else {
      this.setState({
        isError: true,
        errorMessage: "Seed phrase doesn't match.",
      });
    }
  };

  toConfirm = () => {
    this.setState({
      formValue: Account.CONFIRM_ACCOUNT,
      buttonName: Account.GENERATE_BUTTON_TEXT,
      onSubmit: this.handelConfirm,
      disableAccountSettings: true,
    });
  };

  handleNext = () => {
    const { alias } = this.state;
    const { isAliasError, aliasErrorMessage } = this.validateAlias(alias);
    if (isAliasError) {
      this.aliasInput.focus();
    } else {
      this.toConfirm();
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

  handleConfirmSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.confirmSeedPhrase);
    if (this.state.confirmSeedPhrase === '' || !isError) {
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
      seedWords, keypairType, keypairTypes, account
    } = this.props;
    const {
      value,
      formValue,
      buttonName,
      onSubmit,
      importedSeedPhrase,
      confirmSeedPhrase,
      isError,
      errorMessage,
      isAliasError,
      aliasErrorMessage,
      labels,
      alias,
      disableAccountSettings,
      importSeedPhraseInputName,
      confirmSeedPhraseInputName,
      aliasInputName,
      backButtonName,
    } = this.state;

    return (
      <div>
        <EnzymeTabs value={value} onChange={this.handleChange} labels={labels} />
        <CreateAccountForm
          value={formValue}
          generatedSeedWords={seedWords}
          importedSeedWords={importedSeedPhrase}
          confirmedSeedWords={confirmSeedPhrase}
          onChange={this.handleImportSeedWordsChange}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
          importSeedPhraseInputName={importSeedPhraseInputName}
          confirmSeedPhraseInputName={confirmSeedPhraseInputName}
          alias={alias}
          seedRef={input => {
            this.seedInput = input;
          }}
          confirmSeedRef={input => {
            this.confirmSeedInput = input;
          }}
          handleSeedWordsOnBlur={this.handleSeedWordsOnBlur}
          handleConfirmSeedWordsOnBlur={this.handleConfirmSeedWordsOnBlur}
          className="create-account-form"
        />
        <CreateAccountSettings
          disableAccountSettings={disableAccountSettings}
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
        {formValue === Account.CONFIRM_ACCOUNT || account !== undefined ? (
          <FooterWithTwoButton
            onNextClick={onSubmit}
            onBackClick={this.handelBack}
            backButtonName={backButtonName}
            nextButtonName={buttonName}
          />
        ) : (
          <FooterButton onClick={onSubmit} name={buttonName} />
        )}
      </div>
    );
  }
}

CreateAccount.defaultProps = {
  seedWords: '',
  createFirstAccountWithSeedPhrase: undefined,
  error: null,
  resetImportAccountWithSeedPhraseError: undefined,
};

CreateAccount.propTypes = {
  createFirstAccountWithSeedPhrase: PropTypes.func,
  error: PropTypes.string,
  resetImportAccountWithSeedPhraseError: PropTypes.func,
  seedWords: PropTypes.string,
};
