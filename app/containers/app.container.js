import { connect } from 'react-redux';
import App from './app.component';
import { onBoard } from '../actions/initialize';
import { switchNetwork, onToggleDeveloperMode } from '../actions/network';
import {
  changePage,
  updateAppLoading,
  fetchAndUpdateAppManifest,
  updateBackupPage,
} from './actions';
import { clearTransferDetails, resetConfirmOnBoarding } from '../views/transfer/actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  isConnected: state.networkReducer.isConnected,
  isDeveloperMode: state.networkReducer.isDeveloperMode,
  options: state.appStateReducer.options,
});

const mapDispatchToProps = {
  onBoard,
  switchNetwork,
  changePage,
  clearTransferDetails,
  updateAppLoading,
  resetConfirmOnBoarding,
  fetchAndUpdateAppManifest,
  updateBackupPage,
  onToggleDeveloperMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
