import { connect } from 'react-redux';
import CustomNetwork from './custom-network.component';
import { changePage } from '../../containers/actions';
import {
  validateAndSaveURL,
  customNetworkValidationError,
  customNetworkValidationSuccess,
} from '../../actions/network';

const mapStateToProps = state => ({
  customNetwork: state.networkReducer.customNetwork,
  customNetworkSuccess: state.networkReducer.customNetworkSuccess,
  customNetworkError: state.networkReducer.customNetworkError,
  backupPage: state.appStateReducer.backupPage,
});

const mapDispatchToProps = {
  changePage,
  validateAndSaveURL,
  customNetworkValidationError,
  customNetworkValidationSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomNetwork);
