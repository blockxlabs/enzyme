// Import Validators
import validator from 'validator';
import BigNumber from 'bignumber.js';
import bip0039WordList from '../../../lib/constants/bip0039';
import { isFirefox } from '../../../lib/services/browser';

// Declare Custom Validation methods
const passwordMatch = (confirmation, state) => state.password === confirmation;

// Address Validation
const isValidAddress = address => /^0x[0-9a-fA-F]{64}$/.test(address);

const isValidAddressForSendToken = (address, state) => {
  if (validator.isEmpty(address) && state.amount !== '') {
    return false;
  }
  if (validator.isEmpty(address) && state.amount === '') {
    return true;
  }

  return isValidAddress(address);
};

// Private Key Validation
const isValidPrivateKey = privateKey => /[0-9a-fA-F]{128}$/.test(privateKey);

// Import Wallet Validation Methods
const validPrivateKey = (privateKey, state) => {
  if (validator.isEmpty(privateKey) && !state.submitted) {
    return true;
  }

  return isValidPrivateKey(privateKey);
};

const isKeystorePasswordEmpty = (keystorePassword, state) => {
  if (!state.submitted) return false;

  if (state.keystoreFileName === '' && keystorePassword === '') {
    return false;
  }

  return validator.isEmpty(keystorePassword);
};

const validKeystoreFile = (keystoreFileName, state) => {
  if (keystoreFileName === '' && state.keystorePassword !== '') {
    return true;
  }

  if (keystoreFileName === '') {
    return false;
  }

  return false;
};

// Valid Custom URL
const isValidCustomURL = url => {
  if (url.match(/localhost/)) return true;

  return validator.isURL(url);
};

const isValidURLScheme = url => {
  if (url.match('https://')) return true;
  if (!isFirefox()) {
    if (url.match('http://')) return true;
  }
  return false;
};

const customNetworkUrlErrorMsg = () => {
  let msg = 'Please enter http:// or https:// scheme.';
  if (isFirefox()) {
    msg = 'Please enter https:// scheme.';
  }
  return msg;
};
// Send Token Amount Validation
const validAmount = amount => {
  if (amount === '-') return false;
  return amount === '' || !Number.isNaN(amount);
};

const validDecimals = amount => {
  if (amount) {
    return amount.split('.')[1] ? amount.split('.')[1].length <= 18 : true;
  }
  return true;
};

const scientificNotation = amount => {
  const match = `${amount}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  const valid = Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  return valid ? valid <= 18 : true;
};

const greaterThanBalance = (amount, state) => {
  if (amount !== undefined && amount !== '') {
    return new BigNumber(amount).lte(new BigNumber(state.balanceAmount));
  }
  return true;
};

const greaterThanZero = amount => Number(amount) >= 0;

// Send Token Hex Data String Validation
const isHexString = value => {
  if (validator.isEmpty(value)) return true;

  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/) || value === '0x') {
    return false;
  }
  return true;
};

// Valid Seed Words
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
  createVaultValidation: [
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Password is required.',
    },
    {
      field: 'confirmPassword',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Password confirmation is required.',
    },
    {
      field: 'confirmPassword',
      method: passwordMatch,
      validWhen: true,
      message: 'Password and password confirmation do not match.',
    },
  ],
  importSeedPhraseValidation: [
    {
      field: 'seedPhrase',
      method: validSeedPhrase,
      validWhen: true,
      message: null,
    },
  ],
  sendTokenValidation: [
    {
      field: 'from',
      method: isValidAddressForSendToken,
      validWhen: true,
      message: 'Invalid address.',
    },
    {
      field: 'to',
      method: isValidAddressForSendToken,
      validWhen: true,
      message: 'Invalid address.',
    },
    {
      field: 'amount',
      method: greaterThanZero,
      validWhen: true,
      message: 'Invalid amount.',
    },
    {
      field: 'amount',
      method: validDecimals,
      validWhen: true,
      message: 'Invalid amount.',
    },
    {
      field: 'amount',
      method: scientificNotation,
      validWhen: true,
      message: 'Invalid amount.',
    },
    {
      field: 'amount',
      method: greaterThanBalance,
      validWhen: true,
      message: 'Insufficient amount in wallet.',
    },
    {
      field: 'amount',
      method: validAmount,
      validWhen: true,
      message: 'Invalid amount.',
    },
    {
      field: 'hexData',
      method: isHexString,
      validWhen: true,
      message: 'Invalid hex string.',
    },
  ],
  customNetworkValidation: [
    {
      field: 'url',
      method: validator.isEmpty,
      validWhen: false,
      message: 'URL is required.',
    },
    {
      field: 'url',
      method: isValidCustomURL,
      validWhen: true,
      message: 'Invalid URL.',
    },
    {
      field: 'url',
      method: isValidURLScheme,
      validWhen: true,
      message: customNetworkUrlErrorMsg(),
    },

    {
      field: 'port',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Port is required.',
    },
    {
      field: 'port',
      method: validator.isPort,
      validWhen: true,
      message: 'Port should not be greater than 65535.',
    },
  ],
  importWallet: [
    {
      field: 'privateKey',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Private key is required.',
    },
    {
      field: 'privateKey',
      method: isValidPrivateKey,
      validWhen: true,
      message: 'Invalid private key.',
    },
  ],
  importWalletDropdown: [
    {
      field: 'privateKeyInput',
      method: validPrivateKey,
      validWhen: true,
      message: 'Invalid private key.',
    },
    {
      field: 'keystorePassword',
      method: isKeystorePasswordEmpty,
      validWhen: false,
      message: 'Password is required.',
    },
    {
      field: 'keystoreFileName',
      method: validKeystoreFile,
      validWhen: false,
      message: 'File is required.',
    },
  ],
  sessionTimeout: [
    {
      field: 'timeout',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Timeout is required.',
    },
    {
      field: 'timeout',
      method: validator.isNumeric,
      validWhen: true,
      message: 'Invalid Session Timeout.',
    },
  ],
};

export default validatonObj;
