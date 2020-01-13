import * as Store from './store-service';

export const hydrateStore = async (latestData, hashKey) => {
  try {
    const {
      accounts: { accounts, currentAccount },
      transactions: { transactionArr },
      permissions: { whiteListedDApps },
      network: { currentNetwork, isDeveloperMode },
      addressBook: { addressBook },
    } = latestData;
    await Promise.all([
      Store.updateHashKeyState(hashKey),
      Store.updateCurrentAccountState(currentAccount),
      Store.updateWhiteListedDAppsState(whiteListedDApps),
      Store.updatesAccountsState(accounts),
      Store.updateTransactionsState(transactionArr),
      Store.updateCurrentNetworkState(currentNetwork),
      Store.updateDeveloperMode(isDeveloperMode || false),
      Store.updateAppState(),
      Store.updateAddressBook(addressBook),
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in hydrating store...please contact developer team.');
  }
};
