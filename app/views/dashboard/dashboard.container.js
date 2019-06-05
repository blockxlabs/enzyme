import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  createToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
