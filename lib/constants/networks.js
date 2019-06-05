export const ALEXANDER_NETWORK = {
  text: 'Alexander',
  value: 'polkadot',
  networkURL: 'wss://poc3-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
  transactionUrl: 'https://polkascan.io/pre/alexander/system/extrinsic',
  faucetUrl: 'https://faucets.blockxlabs.com/',
  faucetText: 'Universal Faucet (at BlockX Labs).',
};

export const CHARRED_CHERRY_NETWORK = {
  text: 'Charred Cherry',
  value: 'substrate',
  networkURL: 'wss://substrate-rpc.parity.io/',
  networkPort: '',
  networkFullUrl: 'wss://substrate-rpc.parity.io/',
  transactionUrl: 'https://polkadot.js.org/apps/#/explorer',
};

export const LOCALHOST_NETWORK = {
  text: 'Localhost',
  value: 'localhost',
  networkURL: 'ws://127.0.0.1',
  networkPort: '9944',
  networkFullUrl: 'ws://127.0.0.1:9944',
};

export const DOT_NETWORK_LIST = [ALEXANDER_NETWORK, CHARRED_CHERRY_NETWORK, LOCALHOST_NETWORK];

// Custom Network Validation

export const CUSTOM = 'custom';
export const HTTPS = 'https';
export const HTTP = 'http';
export const LOCALHOST = 'localhost';
export const WS = 'ws';
export const WSS = 'wss';
export const DEFAULT_NON_SSL_PORT = '9944';
export const DEFAULT_SSL_PORT = '443';
