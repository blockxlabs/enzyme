const extension = require('extensionizer');

extension.runtime.onInstalled.addListener(() => {
  // extension.tabs.create({
  //   url: 'https://polkadot.network/'
  // });
});

require('./messaging/popup');
