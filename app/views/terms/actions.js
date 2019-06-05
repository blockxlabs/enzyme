import * as TermsActionTypes from './action-types';
import * as StorageKeys from '../../../lib/constants/storage-keys';
import AppConfig from '../../../lib/constants/config';
import * as StorageService from '../../../lib/services/extension/storage';

const updateTermsStatus = isAgree => ({
  type: TermsActionTypes.TERMS_STORE_AGREE,
  isAgree,
});

export const storeTermsStatus = agree => async dispatch => {
  await StorageService.setLocalStorage(StorageKeys.TERMS, AppConfig.touVersion);
  return dispatch(updateTermsStatus(agree));
};

export const verifyTermsVersion = () => async dispatch => {
  const response = await StorageService.getLocalStorage(StorageKeys.TERMS);
  if (response) {
    const buildTermsVersion = AppConfig.touVersion;
    return dispatch(
      updateTermsStatus(parseInt(buildTermsVersion, 10) === parseInt(response.terms, 10)),
    );
  }
  return dispatch(updateTermsStatus(false));
};
