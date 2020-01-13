import * as AccountActions from '../../actions/account';
import { createToast } from '../../constants/toast';
import { Account } from '../../api';
import { onRemoveAddress } from '../../../lib/services/static-message-factory-service';

export const getContacts = () => async dispatch => {
  try {
    await AccountActions.fetchAndSetContacts(dispatch);
  } catch (e) {
    dispatch(createToast({ message: 'Error removing account', type: 'error' }));
  }
};

export const removeContact = contactToRemove => async dispatch => {
  try {
    const { fname } = contactToRemove;
    await Account.removeContact(contactToRemove);
    AccountActions.fetchAndSetContacts(dispatch);
    dispatch(createToast({ message: onRemoveAddress(fname), type: 'success' }));
  } catch (e) {
    dispatch(createToast({ message: 'Error removing address', type: 'error' }));
  }
};
