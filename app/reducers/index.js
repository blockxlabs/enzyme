import { combineReducers } from 'redux';
import networkReducer from './network';
import accountReducer from './account';
import toast from './toast';
import termsReducer from '../views/terms/reducer';
import appStateReducer from '../containers/reducer';
import signUpReducer from '../views/sign-up/reducer';
import createAccountReducer from '../views/create-account/reducer';
import unlockEnzymeReducer from '../views/sign-in/reducer';
import transferReducer from '../views/transfer/reducer';
import dashboardReducer from '../views/dashboard/reducer';

export default combineReducers({
  networkReducer,
  accountReducer,
  toast,
  termsReducer,
  appStateReducer,
  signUpReducer,
  createAccountReducer,
  unlockEnzymeReducer,
  transferReducer,
  dashboardReducer,
});
