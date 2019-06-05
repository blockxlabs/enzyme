import * as Types from './action-types';
import { fetchManifest } from '../api/on-boarding';

export const changePage = page => ({
  type: Types.APPSTATE_CHANGE_PAGE_STATUS,
  page,
});

export const updateIsAppOnBoarded = isOnBoarded => ({
  type: Types.APPSTATE_IS_APP_ONBOARDED,
  isOnBoarded,
});

export const updateAppLoading = isLoading => ({
  type: Types.APPSTATE_IS_LOADING,
  isLoading,
});

export const updateAppManifest = manifest => ({
  type: Types.APPSTATE_MANIFEST,
  manifest,
});

export const updateBackupPage = backupPage => ({
  type: Types.APPSTATE_UPDATE_BACKUP_PAGE,
  backupPage,
});

export const fetchAndUpdateAppManifest = () => async dispatch => {
  const manifest = await fetchManifest();
  dispatch(updateAppManifest(manifest));
};
