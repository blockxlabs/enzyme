import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  accounts: state.createAccountReducer.accounts,
  account: state.createAccountReducer.account,
  balances: state.createAccountReducer.balances,
  balance: state.createAccountReducer.balance,
  transactions: state.dashboardReducer.transactions,
});

const mapDispatchToProps = {
  changePage,
  createToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
