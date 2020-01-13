import * as CreateAccountActionTypes from './action-types';
import { Account, OnBoarding } from '../../api';
import { onBoard } from '../../actions/initialize';
import { createToast } from '../../constants/toast';
import { onCreateAccount } from '../../../lib/services/static-message-factory-service';
import { updateAppLoading } from '../../containers/actions';
import * as APIConstants from '../../../lib/constants/api';

export const createFirstAccountWithSeedPhraseError = error => ({
  type: CreateAccountActionTypes.CREATE_FIRST_ACCOUNT_SEED_PHRASE_ERROR,
  error,
});

export const createDuplicateAliasError = error => ({
  type: CreateAccountActionTypes.CREATE_DUPLICATE_ALIAS_ERROR,
  error,
});

export const createFirstAccountWithSeedPhraseSuccess = () => ({
  type: CreateAccountActionTypes.CREATE_FIRST_ACCOUNT_SEED_PHRASE_SUCCESS,
});

export const updateKeypairType = keypairType => ({
  type: CreateAccountActionTypes.UPDATE_KEYPAIR_TYPE,
  keypairType,
});

export const updateAccountAliasSuccess = () => ({
  type: CreateAccountActionTypes.ACCOUNT_ALIAS_UPDATE_SUCCESS,
});

export const updateAccountAliasError = aliasError => ({
  type: CreateAccountActionTypes.ACCOUNT_ALIAS_UPDATE_ERROR,
  aliasError,
});

export const setAndStartOnBoarding = () => async dispatch => {
  await OnBoarding.setIsAppOnBoarded();
  await dispatch(onBoard());
};

export const createFirstAccountWithSeedPhrase = (seedPhrase, alias) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(updateAppLoading(true));
    const { keypairType } = getState().createAccountReducer;
    const account = await Account.createAccount(
      seedPhrase,
      true,
      keypairType,
      alias !== '' ? alias : undefined,
    );
    const { alias: newAlias } = account;
    dispatch(createToast({ message: onCreateAccount(newAlias), type: 'success' }));
    dispatch(createFirstAccountWithSeedPhraseSuccess());
    dispatch(setAndStartOnBoarding());
  } catch (e) {
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    if (e.message === APIConstants.DUPLICATE_ALIAS.toString()) {
      dispatch(createDuplicateAliasError(error));
    } else {
      dispatch(createFirstAccountWithSeedPhraseError(error));
    }
    dispatch(updateAppLoading(false));
  }
};

export const resetImportAccountWithSeedPhraseError = () => dispatch => {
  dispatch(createFirstAccountWithSeedPhraseError(null));
  dispatch(createDuplicateAliasError(null));
};

export const setKeypairType = value => (dispatch, getState) => {
  const { keypairTypes } = getState().createAccountReducer;
  const keypairType = keypairTypes.find(kpType => kpType.value === value);
  dispatch(updateKeypairType(keypairType));
};
