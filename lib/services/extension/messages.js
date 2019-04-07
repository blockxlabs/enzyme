const extension = require('extensionizer');

export const sendMessage = message => {
  const { runtime } = extension;
  return new Promise((resolve, reject) => {
    runtime.sendMessage(message, result => {
      const err = runtime.lastError;
      if (!err) {
        resolve(result);
      }
      reject(err);
    });
  });
};
