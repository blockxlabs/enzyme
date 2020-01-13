export const UPDATE_AUTHORISED_DAPP_LIST = 'PERMISSION/UPDATE_AUTHORISED_LIST';

export const updateAuthorizedDAppList = whiteListedDApps => ({
  type: UPDATE_AUTHORISED_DAPP_LIST,
  whiteListedDApps,
});
