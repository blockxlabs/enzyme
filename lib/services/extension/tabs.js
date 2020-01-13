const extension = require('extensionizer');

export const sendMessage = (id, message) => {
  const {
    tabs: { sendMessage },
    runtime,
  } = extension;
  return new Promise((resolve, reject) => {
    sendMessage(id, message, result => {
      const err = runtime.lastError;
      if (!err) {
        resolve(result);
      }
      reject(err);
    });
  });
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
