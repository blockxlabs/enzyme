import { changePage, updateAppLoading } from '../../containers/actions';
import { clearTransferDetails } from '../transfer/actions';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import { createToast } from '../../constants/toast';
import { Transaction } from '../../api';
import { shortenAddress } from '../../services/wallet-service';
import { getTransactions } from '../dashboard/actions';

export const submitTransaction = confirmDetails => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    const { result: tx } = await Transaction.submitTransaction(confirmDetails);
    dispatch(
      createToast({
        message: `Transfer submitted with ${shortenAddress(tx.txnHash)}`,
        type: 'info',
      }),
    );
    dispatch(getTransactions);
  } catch (e) {
    dispatch(
      createToast({
        message: 'Error submitting transaction',
        type: 'error',
      }),
    );
  } finally {
    dispatch(updateAppLoading(false));
    dispatch(changePage(DASHBOARD_PAGE));
    dispatch(clearTransferDetails());
  }
};
