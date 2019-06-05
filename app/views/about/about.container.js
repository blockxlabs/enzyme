import { connect } from 'react-redux';
import About from './about.component';
import { changePage } from '../../containers/actions';

const mapStateToProps = state => ({
  manifest: state.appStateReducer.manifest,
  links: state.appStateReducer.links,
  backupPage: state.appStateReducer.backupPage,
});

const mapDispatchToProps = {
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
