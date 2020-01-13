import * as AccountApi from '../../api/account';
import * as NavConstants from '../../constants/navigation';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';

export const submitContact = contact => async dispatch => {
  try {
    await AccountApi.submitContact(contact);
    dispatch(changePage(NavConstants.DASHBOARD_PAGE));
    dispatch(
      createToast({
        message: 'contact added successfully.',
        type: 'success',
      }),
    );
  } catch (err) {
    dispatch(
      createToast({
        message: err.message,
        type: 'error',
      }),
    );
  }
};
