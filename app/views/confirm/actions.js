import { changePage, updateAppLoading } from '../../containers/actions';
import { clearTransferDetails } from '../transfer/actions';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import { createToast } from '../../constants/toast';
import { Transaction } from '../../api';
import { getTransactions } from '../dashboard/actions';

export const submitTransaction = confirmDetails => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    const { result } = await Transaction.submitTransaction(confirmDetails);
    dispatch(getTransactions);
    dispatch(changePage(DASHBOARD_PAGE));
    dispatch(clearTransferDetails());
    dispatch(updateAppLoading(false));
    return result;
  } catch (e) {
    dispatch(
      createToast({
        message: 'Error submitting transaction',
        type: 'error',
      }),
    );
  }
  dispatch(changePage(DASHBOARD_PAGE));
  dispatch(clearTransferDetails());
  dispatch(updateAppLoading(false));
};

export const isNewAddress = address => async dispatch => {
  try {
    const { result } = await Transaction.isNewAddress(address);
    return result;
  } catch (e) {
    dispatch(
      createToast({
        message: 'Error submitting transaction',
        type: 'error',
      }),
    );
  }
};
