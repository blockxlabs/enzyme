/* eslint-disable import/no-extraneous-dependencies */
// Import Validators
import validator from 'validator';
import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { isHex, hexToU8a } from '@polkadot/util';
import BigNumber from 'bignumber.js';
import bip0039WordList from '../../../lib/constants/bip0039';
import { isFirefox } from '../../../lib/services/browser';
import { URL_STRICT_VALIDATION_REGEX, URL_VALIDATION_REGEX } from '../../../lib/constants/regex';

const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};

const isValidAmount = (_, { transferFee, balance, amount }) => {
  const amountBN = new BigNumber(amount);
  const transferFeeBN = new BigNumber(transferFee);
  const balanceBN = new BigNumber(balance);
  if (amountBN.plus(transferFeeBN).lte(balanceBN)) {
    /*eslint-disable no-use-before-define*/
    validatonObj.amountValidation[0].message = null;
    return true;
  }
  /*eslint-disable no-use-before-define*/
  validatonObj.amountValidation[0].message = 'Insufficient funds.';
  return false;
};

const isValidURL = (_, { url }) => {
  if (!isFirefox()) {
    if (URL_VALIDATION_REGEX.test(url)) return true;
  }
  if (!URL_STRICT_VALIDATION_REGEX.test(url)) {
    return false;
  }
  // return false;
  return validator.isURL(url);
};

const validSeedPhrase = (_, { seedPhrase }) => {
  const seedWordsArr = seedPhrase
    .trim()
    .replace(/\n/g, ' ')
    .split(' ');

  if (seedWordsArr.length < 12 || seedWordsArr.length > 12 || seedWordsArr.length !== 12) {
    /*eslint-disable no-use-before-define*/
    validatonObj.importSeedPhraseValidation[0].message = 'Seed phrase must be 12 words long';
    return false;
  }

  try {
    seedWordsArr.forEach(seedWord => {
      if (bip0039WordList.indexOf(seedWord) === -1) {
        /*eslint-disable no-use-before-define*/
        validatonObj.importSeedPhraseValidation[0].message = 'It contains invalid seed words';
        throw new Error('Invalid seed words');
      }
    });
  } catch (e) {
    return false;
  }

  return true;
};

const validatonObj = {
  importSeedPhraseValidation: [
    {
      field: 'seedPhrase',
      method: validSeedPhrase,
      validWhen: true,
      message: null,
    },
  ],
  addressValidation: [
    {
      field: 'to',
      method: isValidAddress,
      validWhen: true,
      message: 'Invalid address.',
    },
  ],
  amountValidation: [
    {
      field: 'amount',
      method: isValidAmount,
      validWhen: true,
      message: null,
    },
  ],
  customNetworkValidation: [
    {
      field: 'url',
      method: isValidURL,
      validWhen: true,
      message: 'Invalid URL.',
    },
  ],
};

export default validatonObj;
