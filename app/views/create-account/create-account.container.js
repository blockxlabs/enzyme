import { connect } from 'react-redux';
import CreateAccount from './create-account.component';
import {
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
  setKeypairType,
  setAndStartOnBoarding,
  createFirstAccountWithSeedPhraseSuccess,
} from './actions';
import { updateAppLoading } from '../../containers/actions';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  error: state.createAccountReducer.error,
  success: state.createAccountReducer.success,
  keypairType: state.createAccountReducer.keypairType,
  keypairTypes: state.createAccountReducer.keypairTypes,
});

const mapDispatchToProps = {
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
  setKeypairType,
  setAndStartOnBoarding,
  createFirstAccountWithSeedPhraseSuccess,
  updateAppLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount);
