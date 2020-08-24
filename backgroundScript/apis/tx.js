/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Keyring } from '@polkadot/keyring';
import { BN } from 'bn.js';
import { TypeRegistry } from '@polkadot/types';
import { getApi } from './api';

export const getAccountPair = account => {
  const { seedWords, keypairType } = account;
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);
  return accountPair;
};

export const getTxnEncodedLength = async (to, fAmount, seedWords, keypairType) => {
  try {
    const api = getApi();

    const accountPair = getAccountPair({ seedWords, keypairType });
    //replace this with commented line once edgeware upgrade mainnet
    //const { nonce } = await api.query.system.account(accountPair.address);
    const nonce = await api.rpc.system.accountNextIndex(accountPair.address);
    const txnExtrinsic = await api.tx.balances
      .transfer(to, new BN(fAmount))
      .sign(accountPair, { nonce });
    const transactionLength = txnExtrinsic.encodedLength;
    return transactionLength;
  } catch (err) {
    throw new Error('Error in getTxnEncodedLength');
  }
};

export const signTransaction = async (seedWords, keypairType, transaction) => {
  const {
    to,
    fAmount,
    account: { address },
  } = transaction.metadata;

  const api = getApi();
  //replace this with commented line once edgeware upgrade mainnet
  //const { nonce } = await api.query.system.account(address);
  const nonce = await api.rpc.system.accountNextIndex(address);
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);

  const signTransaction = await api.tx.balances
    .transfer(to, new BN(fAmount))
    .sign(accountPair, { nonce });
  return signTransaction;
};

export const getSignature = async (account, txnPayload) => {
  // return to Dapp
  const accountPair = getAccountPair(account);
  const registry = new TypeRegistry();
  registry.setSignedExtensions(txnPayload.signedExtensions);
  const signature = registry
    .createType('ExtrinsicPayload', txnPayload, {
      version: txnPayload.version,
    })
    .sign(accountPair);
  return signature;
};
