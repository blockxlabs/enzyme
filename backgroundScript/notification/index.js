import extension from 'extensionizer';

extension.notifications.onClicked.addListener(async detailUrl => {
  if (detailUrl !== undefined || detailUrl !== null) {
    extension.tabs.create({
      url: detailUrl,
    });
  }
});
