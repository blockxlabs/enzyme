import { connect } from 'react-redux';
import CreateAddressBook from './create-address-book.component';
import { submitContact } from './actions';
import { changePage } from '../../containers/actions';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  toAddress: state.addressBookReducer.toAddress,
});

const mapDispatchToProps = {
  submitContact,
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAddressBook);
