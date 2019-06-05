/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Keyring, encodeAddress, decodeAddress } from '@polkadot/keyring';
import moment from 'moment';
import { formatBalance, isHex, hexToU8a } from '@polkadot/util';
import { SUCCESS, FAILURE } from '../../lib/constants/api';
import { getApi, isConnected } from './api';

formatBalance.setDefaults({ unit: 'DOT' });

export const isConnectedCheck = () => {
  const isConnectedBool = isConnected();
  const dateTime = moment().format();
  return { isConnected: isConnectedBool, dateTime };
};
export const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getAddress = (seedWords, keypairType) => {
  const keyring = new Keyring();
  const pairAlice = keyring.addFromUri(seedWords, {}, keypairType);
  const address = keyring.getPair(pairAlice.address()).address();
  return address;
};

export const getBalance = async address => {
  try {
    if (!isConnected()) throw new Error('not connected, balance');
    const api = getApi();
    const balance = await api.query.balances.freeBalance(address);
    const balanceFormatted = formatBalance(balance, true, 15);
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
      balanceFormatted: formatBalance('0', true, 15),
      status: FAILURE,
    };
    return balanceObj;
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = value => {
  const fBalance = formatBalance(value, true, 15);
  return fBalance;
};
