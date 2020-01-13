export const SUCCESS = 200;
export const UNAUTHORIZED = 401;
export const BAD_REQUEST = 400;
export const FAILURE = 500;
export const PERIOD = 10;
export const DUPLICATE_ALIAS = 409;

// keypair type

export const KEYPAIR_EDWARDS = {
  text: 'Edwards(ed25519)',
  value: 'ed25519',
};
export const KEYPAIR_SCHNORRKEL = {
  text: 'Schnorrkel(sr25519)',
  value: 'sr25519',
};

export const KEYPAIR_TYPES = [KEYPAIR_EDWARDS, KEYPAIR_SCHNORRKEL];
