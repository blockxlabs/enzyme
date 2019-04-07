import { connect } from 'react-redux';
import Terms from './terms.component';
import { storeTermsStatus, verifyTermsVersion } from './actions';
import { changePage } from '../../containers/actions';

const mapStateToProps = state => ({
  isAgree: state.termsReducer.isAgree,
});

const mapDispatchToProps = {
  storeTermsStatus,
  verifyTermsVersion,
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Terms);
