import { combineReducers } from 'redux';
import appState from './appState';
import networks from './networks';
import wallets from './wallets';
import toast from './toast';
import animationReducer from './animation';
import termsReducer from '../views/terms/reducer';
import appStateReducer from '../containers/reducer';
import signUpReducer from '../views/sign-up/reducer';
import createAccountReducer from '../views/create-account/reducer';
import unlockEnzymeReducer from '../views/sign-in/reducer';

export default combineReducers({
  appState,
  animationReducer,
  wallets,
  networks,
  toast,
  termsReducer,
  appStateReducer,
  signUpReducer,
  createAccountReducer,
  unlockEnzymeReducer,
});
