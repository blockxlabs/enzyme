import { connect } from 'react-redux';
import Confirm from './confirm.component';
import { changePage } from '../../containers/actions';
import { submitTransaction } from './actions';

const mapStateToProps = state => ({
  transferDetails: state.transferReducer.transferDetails,
});

const mapDispatchToProps = {
  changePage,
  submitTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm);
