import { connect } from 'react-redux';
import CreateAccount from './create-account.component';
import {
  updateAccountList,
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
} from './actions';
import { changePage } from '../../containers/actions';

const mapStateToProps = state => ({
  seedWords: state.signUpReducer.seedWords,
  accounts: state.createAccountReducer.account,
  error: state.createAccountReducer.error,
});

const mapDispatchToProps = {
  changePage,
  updateAccountList,
  createFirstAccountWithSeedPhrase,
  resetImportAccountWithSeedPhraseError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount);
