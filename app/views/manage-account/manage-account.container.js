import { connect } from 'react-redux';
import ManageAccount from './manage-account.component';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { addAccount, changeAccount, removeAccount } from './actions';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  accountMenu: state.dashboardReducer.accountMenu,
  accounts: state.accountReducer.accounts,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  addAccount,
  changeAccount,
  removeAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
