import * as PermissionStore from './store/permission-store';
import * as status from '../../lib/constants/api';

const validateDappURL = url => {
  if (url === undefined || url === null || url === '') {
    return {
      status: status.BAD_REQUEST,
      message: 'The request require url.',
    };
  }
};

const validateData = data => {
  if (data === undefined || data === null || data === '') {
    return {
      status: status.BAD_REQUEST,
      message: 'The request requires data object with url and blockchain.',
    };
  }
};
export const getDAppIsAuthorized = data => {
  const vData = validateData(data);
  if (vData) {
    return vData;
  }
  const { url } = data;
  const vDappUrl = validateDappURL(url);
  if (vDappUrl) {
    return vDappUrl;
  }
  const { whiteListedDApps } = PermissionStore.getPermissionState();

  if (whiteListedDApps[url]) {
    return true;
  }
  // return false for new Dapp.
  return false;
};

export const updateDAppWhiteList = async data => {
  // validation
  const vData = validateData(data);
  if (vData) {
    return vData;
  }
  const { url } = data;
  const vDappUrl = validateDappURL(url);
  if (vDappUrl) {
    return vDappUrl;
  }
  const { whiteListedDApps } = PermissionStore.getPermissionState();
  // Filter by Dapp
  const whiteListedDApp = whiteListedDApps[url];
  // Checking for Duplicate Dapp
  if (whiteListedDApp === undefined) {
    const authoriseDapp = {
      [`${url}`]: {
        url,
      },
    };
    const newWhiteListedDapps = { ...whiteListedDApps, ...authoriseDapp };
    await PermissionStore.updateWhiteListedDAppsState(newWhiteListedDapps);
    return true;
  }
  return true;
};
