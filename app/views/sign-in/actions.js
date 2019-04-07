import { keccak512 } from 'js-sha3';
import * as APITypes from '../../api';
import * as Types from './actionTypes';
import * as AppActions from '../../containers/actions';
import * as AccountActions from '../create-account/actions';
import * as NavConstants from '../../constants/navigation';
import * as APIConstants from '../../../lib/constants/api';

const unlockEnzymeSuccess = () => ({
  type: Types.UNLOCK_ENZYME_SUCCESS,
});

const unlockEnzymeError = error => ({
  type: Types.UNLOCK_ENZYME_SUCCESS,
  error,
});

export const unlockEnzyme = password => async dispatch => {
  dispatch(AppActions.updateAppLoading(true));
  try {
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    const { result } = await APITypes.Account.getAccounts();
    // TODO : DP un-comment after ENZ-44's PR is merged to master
    // const { result: balances } = await APITypes.Account.getCurrentBalance(
    //   result.accounts.map(({ address }) => address)
    // );
    dispatch(AccountActions.updateAccountList(result.accounts));
    dispatch(AccountActions.changeSelectedAccount(result.currentAccount));
    // dispatch(AccountActions.updateAccountBalance(balances));
    dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
    dispatch(unlockEnzymeSuccess());
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    switch (e.code) {
      case APIConstants.UNAUTHORIZED:
        error.message = 'Password is incorrect.';
        break;
      default:
    }
    dispatch(unlockEnzymeError(error));
  } finally {
    dispatch(AppActions.updateAppLoading(false));
  }
};
