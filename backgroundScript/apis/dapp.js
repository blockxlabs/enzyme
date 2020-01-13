import * as TabsApi from '../../lib/services/extension/tabs';
import * as WindowApi from '../../lib/services/extension/window';
import * as ExtensionApi from '../../lib/services/extension/extension';
import * as DappDataStore from '../services/store/dapp-data-store';

export const setMetadata = async data => {
  DappDataStore.updateDAppMetadata(data);
};

export const getMetaData = async () => {
  const { metaData } = DappDataStore.getDappDataState();
  return metaData;
};

export const reply = async data => {
  const { id, message } = data;
  const result = await TabsApi.sendMessage(id, message);
  return result;
};

export const showPopup = async window => {
  // Check for the window object
  if (window) {
    //Gets information about all open windows
    const windows = await WindowApi.getAll();
    const isPopupOpen = windows
      ? windows.some(win => win.id === window.id && win.type === window.type)
      : false;
    if (isPopupOpen) {
      //Returns the fully-qualified URL to the resource.
      const windowURL = await ExtensionApi.getURL('window.html');
      // Updates the properties of a window
      await WindowApi.update(window.id);
      await TabsApi.update(window.tabs[0].id, windowURL);
      return window;
    }
    //Creates a new window.
    const result = await WindowApi.create();
    return result;
  }
  //Creates a new window.
  const result = await WindowApi.create();
  return result;
};

export const closePopup = async window => {
  const result = await WindowApi.get(window.id);
  if (result && result.id === window.id) {
    await WindowApi.remove(window.id);
  }
};
