##Example of Calling Background JS 


import { getLocalStorage } from '../../lib/services/extension/storageService';
import sendMessage from '../../lib/services/extension/messageService';

import * as MessageTypes from '../../lib/constants/message-types';

const CryptoJS = require('crypto-js');

const hashKey = 'hellotheresha3';
const seedWords = 'furnace barrel magnet silly monster will delay giggle battle tumble mail lock';
export async function getHashKeyFromProcess() {
  throw new Error('Its probibited ');
}

export async function decryptState(state) {
  if (hashKey === undefined) {
    await getHashKeyFromProcess();
  }
  try {
    const cipher = state;
    const bytes = CryptoJS.AES.decrypt(cipher, hashKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  } catch (err) {
    throw new Error('Decrypt state');
  }
}

export async function getStore() {
  return {};
}

export async function getStoreBackgroundJS() {
  const decState = await getLocalStorage('state');
  const state = await decryptState(decState.state);
  const initialState = state === undefined ? {} : state;
  const { getStoreBackgroundJS } = require('../store/configureStore');
  return getStoreBackgroundJS(initialState);
}

export async function setHashKey() {
  const response = await sendMessage({ type: 'setHashKeyNew', data: hashKey });
  return response;
}

export async function getCurrentBalance() {
  const response = await sendMessage({
    type: MessageTypes.BG_ACCOUNT_BALANCE,
    data: 'View Balance',
  });
  return response;
}

export async function getCurrentAccount() {
  const response = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CURRENT_ACCOUNT,
    data: 'View Current Account',
  });
  console.log(response);
  return response;
}

export async function getCurrentNetwork() {
  const response = await sendMessage({
    type: MessageTypes.BG_NETWORKS_CURRENT,
    data: 'View Current Network',
  });
  return response;
}

export async function getNewSeedWords() {
  const response = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_SEED_WORDS,
    data: 'View New SeedWords',
  });
  return response;
}

export async function createAccount() {
  const response = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_ACCOUNT,
    data: { seedWords, hashKey },
  });
  return response;
}

export async function getAccounts() {
  const response = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_LIST,
    data: 'List of accounts',
  });
  return response;
}

setHashKey()
  .then()
  .catch();

getCurrentBalance()
  .then()
  .catch();

getCurrentAccount()
  .then(console.log('account creating'))
  .catch();

getCurrentNetwork()
  .then()
  .catch();

getNewSeedWords()
  .then()
  .catch();

createAccount()
  .then(console.log('account creating'))
  .catch();

getAccounts()
  .then()
  .catch();
