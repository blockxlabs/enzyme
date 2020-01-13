const accounts = [
  {
    address: 'DpBwnmm8eQtuEReBkY3p7otougXrPD9UFg6BFp1ttxEXKi2',
    alias: 'ed25515',
    derivationPath: '',
    keypairType: 'ed25519',
    seedWords:
      'trumpet knife surface whale shoulder vague feed island original curve laundry dolphin',
    token: 'KSM',
  },
  {
    address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
    alias: 'kusama',
    derivationPath: '',
    keypairType: 'sr25519',
    seedWords:
      'trumpet knife surface whale shoulder vague feed island original curve laundry dolphin',
    token: 'KSM',
  },
];
const currentAccount = {
  address: 'DY3M4n5ADGEa1PWpuPooK4J2ZmTwmXzNJGFH7APLjzBrTte',
  alias: 'kusama',
  derivationPath: '',
  keypairType: 'sr25519',
  seedWords:
    'trumpet knife surface whale shoulder vague feed island original curve laundry dolphin',
  token: 'KSM',
};

const initialState = {
  accounts,
  currentAccount,
  seedWords: undefined,
  hasAccount: false,
};

export const getAccountState = () => initialState;
