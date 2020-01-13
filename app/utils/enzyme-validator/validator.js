import bip0039WordList from '../../../lib/constants/bip0039';

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

const isAliasValid = (_, { alias }) => {
  try {
    return alias.length <= 12;
  } catch (e) {
    return false;
  }
};

const isFnameValid = (_, { fname }) => {
  try {
    return fname.length <= 12;
  } catch (e) {
    return false;
  }
};

const isLnameValid = (_, { lname }) => {
  try {
    return lname.length <= 12;
  } catch (e) {
    return false;
  }
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
  aliasValidation: [
    {
      field: 'alias',
      method: isAliasValid,
      validWhen: true,
      message: 'Alias must be less than 12 characters.',
    },
  ],
  fnameValidation: [
    {
      field: 'fname',
      method: isFnameValid,
      validWhen: true,
      message: 'Firstname must be less than 12 characters.',
    },
  ],
  lnameValidation: [
    {
      field: 'lname',
      method: isLnameValid,
      validWhen: true,
      message: 'Lastname must be less than 12 characters.',
    },
  ],
};

export default validatonObj;
