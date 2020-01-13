import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const getSeedWords = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_SEED_WORDS,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const createAccount = async (seedWords, isOnBoarding = false, keypairType, alias) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_ACCOUNT,
    seedWords,
    isOnBoarding,
    keypairType,
    alias,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const getCurrentAccount = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CURRENT_ACCOUNT,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getAccounts = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getCurrentBalance = async addresses => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNT_BALANCE,
    addresses,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateAccountAlias = async (alias, address) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_UPDATE_ALIAS,
    alias,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateCurrentAccount = async address => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CURRENT_ACCOUNTS_UPDATE,
    address,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const removeAccount = async address => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_REMOVE_ACCOUNT,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const submitContact = async contact => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_ADD,
    contact,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getContacts = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const removeContact = async contact => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_REMOVE,
    contact,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
