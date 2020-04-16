/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { mnemonicGenerate } from '@polkadot/util-crypto';
import {
  Keyring, setSS58Format, encodeAddress, decodeAddress
} from '@polkadot/keyring';
import {
  formatBalance, isHex, hexToU8a, u8aToHex, u8aToString, stringToU8a
} from '@polkadot/util';
import { SUCCESS, FAILURE } from '../../../lib/constants/api';
import { getApi } from '../api';
import * as ChainApi from '../chain';

export const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getAddress = (seedWords, keypairType) => {
  try {
    setSS58Format(ChainApi.getSs58Format());
    const keyring = new Keyring();
    const pairAlice = keyring.addFromUri(seedWords, {}, keypairType);
    const { address } = keyring.getPair(pairAlice.address);
    return address;
  } catch (err) {
    throw new Error('Error in Custom getAddress');
  }
};

export const getBalance = async address => {
  const unit = ChainApi.getTokenSymbol();
  formatBalance.setDefaults({ unit });
  try {
    const api = getApi();
    const {
      data: { free: balance },
    } = await api.query.system.account(address);
    const balanceFormatted = formatBalance(balance, true, ChainApi.getTokenDecimals());
    const balanceObj = {
      address,
      balance: balance.toString(),
      balanceFormatted,
      status: SUCCESS,
    };
    return balanceObj;
  } catch (err) {
    const balanceObj = {
      address,
      balance: '0',
      balanceFormatted: formatBalance('0', true, ChainApi.getTokenDecimals()),
      status: FAILURE,
    };
    return balanceObj;
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = value => {
  try {
    const unit = ChainApi.getTokenSymbol();
    formatBalance.setDefaults({ unit });
    const fBalance = formatBalance(value, true, ChainApi.getTokenDecimals());
    return fBalance;
  } catch (err) {
    throw new Error('Error in polkadot valueFormatter');
  }
};

export const getAccountPair = async (keypairType, seedWords) => {
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);
  return accountPair;
};

export const getAccountForUI = account => ({
  address: account.address,
  alias: account.alias,
  keypairType: account.keypairType,
});

export const getSignMessage = async (account, message) => {
  const { seedWords, keypairType } = account;
  const accountPair = await getAccountPair(keypairType, seedWords);
  const signedMessage = u8aToHex(accountPair.sign(stringToU8a(message.message)));
  const result = {
    account: getAccountForUI(account),
    message: {
      ...message,
      signedMessage,
    },
  };
  return result;
};

export const getStringMessageFromHex = message => u8aToString(hexToU8a(message));
