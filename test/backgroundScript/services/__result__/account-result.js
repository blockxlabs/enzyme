export const accountState = {
  accounts: [
    {
      seedWords: 'earn taste cabbage dignity call series please panic garbage year keep extend',
      address: '5FPMNegDhvC2wjnYjrpT9dejWidSVRPqFEAZDczCnJvL3tBJ',
      keypairType: 'ed25519',
      alias: 'Account 1',
    },
    {
      seedWords: 'speed road squeeze pizza fitness cancel list mammal sad cave desert depend',
      address: '5Ck3PxgztrtsYs1EECp92VT9BCKCsBe1hECQBCjtt7d4iwCa',
      keypairType: 'ed25519',
      alias: 'Account 2',
    },
    {
      seedWords:
        'silver admit regular dolphin laugh balance hobby tourist follow clerk enable faculty',
      address: '5CBnZwkc7zPwaDoGLJRM5yeNoSc2SVw5PgdVpztu3d8JiFWu',
      keypairType: 'ed25519',
      alias: 'Account 3',
    },
    {
      seedWords: 'since term typical inquiry onion possible carbon antique entry fold art sense',
      address: '5FSGZeAhTmfh2FUFV6fnA6v5mXtgSaXmkEqTkZ7rs3LMi11b',
      keypairType: 'ed25519',
      alias: 'Account 4',
    },
  ],
  currentAccount: {
    address: '5FPMNegDhvC2wjnYjrpT9dejWidSVRPqFEAZDczCnJvL3tBJ',
    alias: 'Account 1',
    keypairType: 'ed25519',
    seedWords: 'earn taste cabbage dignity call series please panic garbage year keep extend',
  },
  hasAccount: true,
  seedWords: undefined,
};

export const accountForDapp = [
  {
    address: '5FPMNegDhvC2wjnYjrpT9dejWidSVRPqFEAZDczCnJvL3tBJ',
    name: 'Account 1',
    meta: { name: 'Account 1', source: 'enzyme' },
  },
  {
    address: '5Ck3PxgztrtsYs1EECp92VT9BCKCsBe1hECQBCjtt7d4iwCa',
    name: 'Account 2',
    meta: { name: 'Account 2', source: 'enzyme' },
  },
  {
    address: '5CBnZwkc7zPwaDoGLJRM5yeNoSc2SVw5PgdVpztu3d8JiFWu',
    name: 'Account 3',
    meta: { name: 'Account 3', source: 'enzyme' },
  },
  {
    address: '5FSGZeAhTmfh2FUFV6fnA6v5mXtgSaXmkEqTkZ7rs3LMi11b',
    name: 'Account 4',
    meta: { name: 'Account 4', source: 'enzyme' },
  },
];

export const unauthoriseResponse = {
  message: 'The request requires user authentication.',
  status: 401,
};

export const BAD_REQUEST = {
  message: 'The request requires data object for authentication.',
  status: 400,
};

export const updateAliasResponse = {
  address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
  newAlias: 'newAlias',
};

export const fullAccountResponse = {
  address: '5FPMNegDhvC2wjnYjrpT9dejWidSVRPqFEAZDczCnJvL3tBJ',
  alias: 'newAlias',
  keypairType: { text: 'Schnorrkel', value: 'sr25519' },
  seedWords:
    'trumpet knife surface whale shoulder vague feed island original curve laundry dolphin',
};

export const accountforUIResponse = {
  address: '5FPMNegDhvC2wjnYjrpT9dejWidSVRPqFEAZDczCnJvL3tBJ',
  alias: 'newAlias',
  keypairType: { text: 'Schnorrkel', value: 'sr25519' },
  token: 'DOT',
};

const KEYPAIR_EDWARDS = {
  text: 'Edwards(ed25519)',
  value: 'ed25519',
};
const KEYPAIR_SCHNORRKEL = {
  text: 'Schnorrkel(sr25519)',
  value: 'sr25519',
};

const KEYPAIR_TYPES = [KEYPAIR_EDWARDS, KEYPAIR_SCHNORRKEL];

export const keypairTypeResponse = {
  KEYPAIR_TYPES,
  KEYPAIR_TYPE: KEYPAIR_EDWARDS,
};
