const extension = require('extensionizer');

require('./messaging/content');

function injectScript(filePath) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  document.documentElement.appendChild(script);
}

if (process.env.NODE_ENV === 'production') {
  const url = extension.extension.getURL('js/inPageScript.bundle.js');
  injectScript(url);
} else {
  injectScript('https://localhost:3000/js/inPageScript.bundle.js');
}
