import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import {
  configEditAccount, configAliasAccount, connectionError, renameAlias
} from './actions';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  network: state.networkReducer.network,
  unit: state.networkReducer.unit,
  isConnected: state.networkReducer.isConnected,
  accountMenu: state.dashboardReducer.accountMenu,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  configEditAccount,
  configAliasAccount,
  renameAlias,
  resetToAddress,
  getUnits,
  connectionError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
