import { connect } from 'react-redux';
import DAppRequests from './dapp-requests.component';
import { createToast } from '../../constants/toast';
import { cancelDAppRequest, allowRequest, fetchNetwork } from './actions';
import { updateAppLoading } from '../../containers/actions';

const mapStateToProps = state => ({
  requests: state.dAppReducer.requests,
  accounts: state.accountReducer.accounts,
  balances: state.accountReducer.balances,
});

const mapDispatchToProps = {
  createToast,
  cancelDAppRequest,
  updateAppLoading,
  allowRequest,
  fetchNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(DAppRequests);
