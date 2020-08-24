// eslint-disable-next-line import/no-extraneous-dependencies

//Original Source:https://github.com/hicommonwealth/edgeware-node/releases/tag/v3.0.8-testnet
//Original Author:Drew Stone
import {
  Keyring, setSS58Format, encodeAddress, decodeAddress
} from '@polkadot/keyring';
import {
  formatBalance, isHex, hexToU8a, u8aToHex, u8aToString
} from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { getApi } from '../api';
import { SUCCESS, FAILURE } from '../../../lib/constants/api';
import { getUSDValue } from '../market-data';

export const getAddress = (seedWords, keypairType) => {
  try {
    setSS58Format(42);
    const keyring = new Keyring({ type: keypairType });
    const pairAlice = keyring.addFromUri(seedWords);
    const { address } = pairAlice;
    return address;
  } catch (err) {
    throw new Error('Error in Beresheet getAddress');
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = value => {
  try {
    formatBalance.setDefaults({ unit: 'tEDG' });
    const fBalance = formatBalance(value, true, 18);
    return fBalance;
  } catch (err) {
    throw new Error('Error in Beresheet valueFormatter');
  }
};

export const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getBalance = async address => {
  formatBalance.setDefaults({ unit: 'tEDG' });
  try {
    const api = getApi();
    const {
      data: { free: balance },
    } = await api.query.system.account(address);
    const marketData = await getUSDValue();
    const balanceFormatted = formatBalance(balance, true, 18);
    const tEDGBalance = formatBalance(balance, { forceUnit: 'tEDG', withSi: true }, 18);
    const balanceObj = {
      address,
      balance: balance.toString(),
      amount: tEDGBalance.replace(' tEDG', ''),
      marketData,
      balanceFormatted,
      status: SUCCESS,
    };
    return balanceObj;
  } catch (err) {
    const balanceObj = {
      address,
      balance: '0',
      balanceFormatted: formatBalance('0', true, 18),
      status: FAILURE,
    };
    return balanceObj;
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
  const signedMessage = u8aToHex(accountPair.sign(message.message));
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
