const extension = require('extensionizer');

const injectCode = {
  code: `var injected = window.web3;
    window.web3 = true;
    injected;`,
  runAt: 'document_start',
};

function isInjected(tabId) {
  return new Promise((resolve, reject) => {
    try {
      extension.tabs.executeScript(tabId, injectCode, result => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
}

function loadScript(name, tabId, cb) {
  if (process.env.NODE_ENV === 'production') {
    extension.tabs.executeScript(
      tabId,
      { file: `/js/${name}.bundle.js`, runAt: 'document_start' },
      cb,
    );
  } else {
    // dev: async fetch bundle
    fetch(`https://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => {
        extension.tabs.executeScript(
          tabId,
          {
            code: fetchRes,
            runAt: 'document_start',
          },
          cb,
        );
      });
  }
}

const arrowURLs = [
  '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
];

extension.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab) {
    if (tab.url) {
      if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) {
        return;
      }
    }
  }
  const result = await isInjected(tabId);
  if (extension.runtime.lastError || result[0]) return;
  /*eslint-disable no-console*/
  loadScript('contentScript', tabId, () => console.log('load inject bundle success!'));
});
