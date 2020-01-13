import { BG_DAPP_RESPONSE } from '../../lib/constants/response-types';
import { FAILURE } from '../../lib/constants/api';

export function resolveRequest(requestType, opts, metadata) {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    try {
      const data = { requestType, opts, metadata };
      window.postMessage(data, location.href);
      window.addEventListener('message', event => {
        // We only accept messages from ourselves
        if (event.source !== window) return;
        if (event.data && event.data.type && event.data.type === BG_DAPP_RESPONSE) {
          const {
            data: { result, status, message },
          } = event;
          if (status === FAILURE) {
            reject(message);
          }
          resolve(result);
        }
      });
    } catch (e) {
      const error = {
        message: e.message,
        stack: e.stack || {},
      };
      reject(error);
    }
  });
}
