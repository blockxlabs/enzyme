import { getStore } from '../../store/store-provider';
import { dispatchUpdateDAppData } from '../../actions/dapp-data';

export const getDappDataState = () => {
  const { dAppDataState } = getStore().getState();
  return { ...dAppDataState };
};

export const updateDAppMetadata = metadata => getStore().dispatch(dispatchUpdateDAppData(metadata));
