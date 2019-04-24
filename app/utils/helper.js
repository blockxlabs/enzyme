import { PROTOCOL_VALIDATION_REGEX } from '../../lib/constants/regex';
import { HTTPS } from '../constants/network';
import { SUCCESS } from '../../lib/constants/api';
import { success } from '../../backgroundScript/services/responseService';

export const createFullNetworkURL = url => {
  if (!PROTOCOL_VALIDATION_REGEX.test(url)) {
    return `${HTTPS}://${url}`;
  }
  return url;
};

export const promiseTimeout = (ms, promise, defaultObj) => {
  const timeout = new Promise(resolve => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve({ result: defaultObj, ...success });
    }, ms);
  });
  return Promise.race([promise, timeout]);
};

export const balanceObjOnTimeout = addresses => addresses.map(address => ({ address, balance: '0', status: SUCCESS }));
