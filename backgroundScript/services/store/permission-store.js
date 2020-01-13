import { getStore } from '../../store/store-provider';
import { updateAuthorizedDAppList } from '../../actions/permissions';

export const getPermissionState = () => {
  const { permissionState } = getStore().getState();
  return { ...permissionState };
};

export const updateWhiteListedDAppsState = whiteListedDApps => getStore().dispatch(updateAuthorizedDAppList(whiteListedDApps));
