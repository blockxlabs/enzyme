const extension = require('extensionizer');

export const sendMessage = (id, message) => {
  const {
    tabs: { sendMessage },
    runtime,
  } = extension;
  //fixed by this doc
  //https://stackoverflow.com/a/62607033
  // fixed error of port open/close issue between tab and background.js.
  // update by KHP/DP
  const err = runtime.lastError;
  if (err) {
    // eslint-disable-next-line no-console
    console.log('runtime lastError', err);
  }
  Promise.resolve().then(() => sendMessage(id, message));
  return true;
};

export const update = (id, url) => {
  const { update } = extension.tabs;
  return new Promise((resolve, reject) => {
    try {
      update(id, { url }, result => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};
