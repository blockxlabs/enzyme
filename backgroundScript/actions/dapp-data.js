export const UPDATE_DAPP_METADATA = 'DAPP/UPDATE_DATA';

export const dispatchUpdateDAppData = metaData => ({
  type: UPDATE_DAPP_METADATA,
  metaData,
});
