const extension = require('extensionizer');

export default function createNotification(title, message, url) {
  return extension.notifications.create(url, {
    type: 'basic',
    title,
    iconUrl: extension.extension.getURL('../../img/icon-32.png'),
    message,
  });
}
