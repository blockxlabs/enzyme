import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import { changePage } from '../../containers/actions';

const mapStateToProps = state => ({
  accounts: state.createAccountReducer.accounts,
  account: state.createAccountReducer.account,
  balance: state.createAccountReducer.balance,
  selectedAccountBalance: state.createAccountReducer.balance.map(acc => {
    if (acc.address === state.createAccountReducer.account.address) {
      return acc.balance;
    }
  }),
});

const mapDispatchToProps = {
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
