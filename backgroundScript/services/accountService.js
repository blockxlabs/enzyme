import * as Wallet from '../apis/dotWallet';
import { getStore } from '../store/storeProvider';
import * as balanceActions from '../actions/balances';
import * as accountActions from '../actions/accounts';
import * as StorageServices from '../../lib/services/extension/storage';
import { ACCOUNTS } from '../../lib/constants/storageKeys';

// TO DO: KHP  Feching Balance move to  watcher services
export const fetchCurrentBalance = async () => {
  const { networkState } = getStore().getState();
  const { networkFullUrl } = networkState.currentNetwork;
  const newBalance = await Wallet.getBalance(networkFullUrl);
  getStore.dispatch(balanceActions.fetchAccountBalance(newBalance));
};

const updatesAccounts = async accounts => {
  getStore().dispatch(accountActions.updateAccountList(accounts));
};

const updateCurrentAccount = async account => {
  getStore().dispatch(accountActions.changeCurrentAccount(account));
};

const updateAccountState = async accountsReducerObj => {
  const { accounts, currentAccount } = accountsReducerObj;
  // persistence reducer from localstorage
  await Promise.all([updatesAccounts(accounts), updateCurrentAccount(currentAccount)]);
};
const constructAlias = str => str.substring(0, 2) + str.substring(str.length - 3, str.length - 1);

const createAccountWithSeed = seedWords => {
  const address = Wallet.getAddress(seedWords);
  return { seedWords, address, alias: constructAlias(address) };
};

export const createSeedWords = () => {
  const seedWords = Wallet.createSeedWords();
  getStore().dispatch(accountActions.setSeedWords(seedWords));
  return seedWords;
};

const createNewAccount = () => {
  const seedWords = createSeedWords();
  const address = Wallet.getAddress(seedWords);

  return { seedWords, address, alias: constructAlias(address) };
};

const mergeAccounts = (accounts, newAccount) => {
  const newAccounts = [...accounts, { ...newAccount }];
  return newAccounts;
};

const storingAccounts = async () => {
  // storing accounts reducer state to local storage.
  const { appState, accountState } = getStore().getState();
  const encryptedAccountState = StorageServices.encrypt(accountState, appState.hashKey);
  const result = await StorageServices.setLocalStorage(ACCOUNTS, encryptedAccountState);
  return result;
};

export const getAccounts = async () => {
  const localAccountObj = await StorageServices.getLocalStorage(ACCOUNTS);
  return localAccountObj;
};
export const decryptAccounts = async (accounts, hashKey) => {
  const decryptAccounts = StorageServices.decrypt({ ...accounts }, hashKey);
  await updateAccountState(decryptAccounts);
  return decryptAccounts;
};

export const createAccount = async (seedWords, isOnBoarding) => {
  // grab all the data
  const account = seedWords === undefined ? createNewAccount() : createAccountWithSeed(seedWords);
  const { accounts } = getStore().getState().accountState;

  // necessary validation/processing
  // Onboarding using  Import seed Words not require merge
  const newAccounts = isOnBoarding === true ? [account] : mergeAccounts(accounts, account);

  // update reducer state and store
  // persistence
  await Promise.all([
    updatesAccounts(newAccounts),
    updateCurrentAccount(account),
    storingAccounts(),
  ]);

  // return something ..
  return account.address;
};
