const extension = require('extensionizer');

export function getBadgeText() {
  return extension.browserAction.getBadgeText({});
}

export function setBadgeText(text) {
  return extension.browserAction.setBadgeText({ text });
}
