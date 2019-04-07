import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import GenerateSeedPhrase from '../../components/common/generate-seed-phrase';
import ImportSeedPhrase from '../../components/common/import-seed-phrase';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import './styles.css';
import { DASHBOARD_PAGE } from '../../constants/navigation';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  tabsRoot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tabsIndicator: {
    backgroundColor: 'rgba(215, 95, 160, 1)',
    height: '2px',
  },
  tabRoot: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '180px',
    height: '48px',
    textTransform: 'capitalise',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: 'rgba(215, 95, 160, 1)',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'rgba(215, 95, 160, 1)',
      fontSize: '14px',
    },
    '&:focus': {
      color: 'rgba(215, 95, 160, 1)',
    },
  },
  tabSelected: {},
});
const TO_DASHBOARD_BUTTON_TEXT = 'DASHBOARD';
const IMPORT_BUTTON_TEXT = 'IMPORT';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      importedSeedPhrase: '',
      isError: false,
      errorMessage: '',
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
    const { classes, seedWords } = this.props;
    const {
      value, importedSeedPhrase, isError, errorMessage
    } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Generate"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Import"
          />
        </Tabs>
        <div className="create-account-content-container">
          {value === 0 && (
            <div>
              <GenerateSeedPhrase seedWords={seedWords} />
              <Button onClick={this.handleClick}>{TO_DASHBOARD_BUTTON_TEXT}</Button>
            </div>
          )}
          {value === 1 && (
            <div>
              <ImportSeedPhrase
                onChange={this.handleImportSeedWordsChange}
                seedWords={importedSeedPhrase}
                isError={isError}
                errorMessage={errorMessage}
                handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
                onBlur={this.handleSeedWordsImportOnBlur}
              />
              <Button onClick={this.handleImportSeedWordClick}>{IMPORT_BUTTON_TEXT}</Button>
            </div>
          )}
        </div>
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

export default withStyles(styles)(CreateAccount);
