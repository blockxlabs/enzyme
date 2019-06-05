import * as Wallet from '../apis/dot-wallet';
import { getStore } from '../store/store-provider';
import * as accountActions from '../actions/accounts';
import * as StorageServices from '../../lib/services/extension/storage';
import { ACCOUNTS } from '../../lib/constants/storage-keys';
import { updatesAccountsState, updateCurrentAccountState } from './app-service';
import { KEYPAIR_EDWARDS } from '../../lib/constants/api';

const constructAlias = isOnBoarding => {
  //TODO: KP Write full logic when we have multiple wallet.
  const { accounts } = getStore().getState().accountState;

  const alias = isOnBoarding && accounts.length > 0
    ? `Account ${accounts.length}`
    : `Account ${accounts.length + 1}`;
  return alias;
};

const createAccountWithSeed = (seedWords, keypairType, isOnBoarding, alias) => {
  const address = Wallet.getAddress(seedWords, keypairType);
  return {
    seedWords,
    address,
    keypairType,
    alias: alias !== undefined ? alias : constructAlias(isOnBoarding),
  };
};

export const createSeedWords = () => {
  const seedWords = Wallet.createSeedWords();
  getStore().dispatch(accountActions.setSeedWords(seedWords));
  return seedWords;
};

const createNewAccount = keypairType => {
  const seedWords = createSeedWords();
  const address = Wallet.getAddress(seedWords, keypairType);
  return {
    seedWords,
    address,
    keypairType,
    alias: constructAlias(address),
  };
};

const mergeAccounts = (accounts, newAccount) => {
  const newAccounts = [...accounts, { ...newAccount }];
  return newAccounts;
};

export const updateAccountAlias = async (address, newAlias) => {
  const { accounts } = getStore().getState().accountState;

  //validate alias
  const duplicateAlias = accounts.find(x => x.alias === newAlias);
  if (duplicateAlias === undefined) {
    const accountIndex = accounts.findIndex(x => x.address === address);
    // update alias
    if (accountIndex >= 0) {
      accounts[accountIndex].alias = newAlias;
      await updatesAccountsState(accounts);
      return { address, newAlias };
    }
    throw new Error('account is not avalible');
  }
  throw new Error('Duplicate alias');
};

// isOnboarding Require
export const getAccounts = async () => {
  const localAccountObj = await StorageServices.getLocalStorage(ACCOUNTS);
  return localAccountObj;
};

export const createAccount = async (seedWords, keypairType, isOnBoarding, alias) => {
  // default keypair type Edwards
  const keypairTypeValue = keypairType === undefined ? KEYPAIR_EDWARDS.value : keypairType.value;

  // grab all the data
  const account = seedWords === undefined
    ? createNewAccount(keypairTypeValue)
    : createAccountWithSeed(seedWords, keypairTypeValue, isOnBoarding, alias);
  const { accounts } = getStore().getState().accountState;

  // necessary validation/processing
  // Onboarding using  Import seed Words not require merge
  const newAccounts = isOnBoarding === true ? [account] : mergeAccounts(accounts, account);
  // update reducer state
  await Promise.all([updatesAccountsState(newAccounts), updateCurrentAccountState(account)]);

  // return  created account address
  return account.address;
};

export const getAccountsWithoutSeedWords = accountState => {
  // FE not require seedwords
  const { accounts, currentAccount } = accountState;
  const reformattedCurrentAccount = {
    address: currentAccount.address,
    alias: currentAccount.alias,
  };
  const reformattedAccounts = accounts.map(obj => {
    const accountsWithoutSeedWords = {
      address: obj.address,
      alias: obj.alias,
      keypairType: obj.keypairType,
    };
    return accountsWithoutSeedWords;
  });
  const newAccountState = {
    accounts: reformattedAccounts,
    currentAccount: reformattedCurrentAccount,
  };
  return newAccountState;
};

export const isValidAddress = address => Wallet.isValidAddress(address);
