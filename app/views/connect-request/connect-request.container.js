import { connect } from 'react-redux';
import ConnectRequest from './connect-request.component';
import { changePage, updateAppLoading } from '../../containers/actions';
import {
  initializeRequest,
  allowAccountAuthorization,
  denyAccountAuthorization,
  updateSelectedAccount,
  fetchNetwork,
} from './actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  accountOptions: state.connectRequestReducer.accountOptions,
  selectedAccount: state.connectRequestReducer.selectedAccount,
  title: state.connectRequestReducer.title,
  request: state.dAppReducer.request,
});

const mapDispatchToProps = {
  changePage,
  updateAppLoading,
  initializeRequest,
  allowAccountAuthorization,
  denyAccountAuthorization,
  updateSelectedAccount,
  createToast,
  fetchNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectRequest);
