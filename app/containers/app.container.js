import { connect } from 'react-redux';
import App from './app.component';
import { onBoard } from '../actions/initialize';
import { switchNetwork } from '../actions/network';
import { changePage } from './actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  isLoading: state.appStateReducer.isLoading,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  onBoard,
  switchNetwork,
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
