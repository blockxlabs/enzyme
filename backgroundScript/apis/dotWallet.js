/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { mnemonicGenerate } from '@polkadot/util-crypto';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { Keyring } from '@polkadot/keyring';
import { SUCCESS, FAILURE } from '../../lib/constants/api';

export const getAddress = seedWords => {
  const keyring = new Keyring();
  const pairAlice = keyring.addFromUri(seedWords);
  const address = keyring.getPair(pairAlice.address()).address();
  return address;
};

export const getBalance = async (address, networkFullUrl) => {
  const provider = new WsProvider(networkFullUrl);
  try {
    const api = await ApiPromise.create(provider);
    const balance = await api.query.balances.freeBalance(address);
    const balanceObj = { address, balance: balance.toString(), status: SUCCESS };
    return balanceObj;
  } catch (err) {
    const balanceObj = { address, balance: '0', status: FAILURE };
    return balanceObj;
  } finally {
    if (provider.isConnected()) provider.disconnect();
  }
};

export const createSeedWords = () => mnemonicGenerate();
