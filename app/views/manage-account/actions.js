import { Account } from '../../api';
import * as AccountActions from '../../actions/account';
import * as AppActions from '../../containers/actions';
import { createToast } from '../../constants/toast';
import {
  onRemoveAccount,
  onUpdateCurrentAccount,
} from '../../../lib/services/static-message-factory-service';

export const addAccount = () => async dispatch => {
  dispatch(AppActions.updateAppLoading(true));
  await dispatch(AccountActions.getSeedWords());
  dispatch(AppActions.updateAppLoading(false));
};

export const changeAccount = account => async dispatch => {
  try {
    dispatch(AppActions.updateAppLoading(true));
    const { address, alias } = account;
    await Account.updateCurrentAccount(address);
    AccountActions.fetchAndSetAccounts(dispatch);
    dispatch(AppActions.updateAppLoading(false));
    dispatch(createToast({ message: onUpdateCurrentAccount(alias), type: 'success' }));
  } catch (e) {
    dispatch(createToast({ message: 'Error selecting current account', type: 'error' }));
  }
};

export const removeAccount = accountToRemove => async dispatch => {
  try {
    const { address, alias } = accountToRemove;
    await Account.removeAccount(address);
    AccountActions.fetchAndSetAccounts(dispatch);
    dispatch(createToast({ message: onRemoveAccount(alias), type: 'success' }));
  } catch (e) {
    dispatch(createToast({ message: 'Error removing account', type: 'error' }));
  }
};
