import * as Types from './action-types';
import { LOADER_OVERLAY, DASHBOARD_PAGE } from '../constants/navigation';
import { OPTIONS } from '../constants/options';
import { LINKS } from '../constants/links';

const initialState = {
  page: LOADER_OVERLAY,
  isLoading: false,
  isOnBoarded: false,
  options: OPTIONS,
  manifest: undefined,
  links: LINKS,
  backupPage: DASHBOARD_PAGE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.APPSTATE_CHANGE_PAGE_STATUS:
      return {
        ...state,
        ...{
          page: action.page,
        },
      };
    case Types.APPSTATE_IS_LOADING:
      return {
        ...state,
        ...{
          isLoading: action.isLoading,
        },
      };
    case Types.APPSTATE_IS_APP_ONBOARDED:
      return {
        ...state,
        ...{
          isOnBoarded: action.isOnBoarded,
        },
      };
    case Types.APPSTATE_MANIFEST:
      return {
        ...state,
        ...{
          manifest: action.manifest,
        },
      };
    case Types.APPSTATE_UPDATE_BACKUP_PAGE:
      return {
        ...state,
        ...{
          backupPage: action.backupPage,
        },
      };
    default:
      return state;
  }
};

export default reducer;
