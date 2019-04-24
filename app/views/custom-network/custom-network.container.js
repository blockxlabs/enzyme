import { connect } from 'react-redux';
import CustomNetwork from './custom-network.component';
import { changePage } from '../../containers/actions';
import { setCustomNetwork } from '../../actions/network';

const mapStateToProps = state => ({
  customNetwork: state.networkReducer.customNetwork,
});

const mapDispatchToProps = {
  changePage,
  setCustomNetwork,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomNetwork);
