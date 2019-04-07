import * as Types from './actionTypes';

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
