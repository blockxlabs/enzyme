export const ALEXANDER_NETWORK = {
  text: 'Alexander',
  value: 'polkadot',
  networkURL: 'wss://poc3-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
  transactionUrl: 'https://polkascan.io/pre/alexander/transaction',
  faucetUrl: 'https://faucets.blockxlabs.com/',
  faucetText: 'Universal Faucet (at BlockX Labs).',
  unit: 'DOT',
};

export const KUSAMA_NETWORK = {
  text: 'Kusama',
  value: 'Kusama',
  networkURL: 'wss://kusama-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://kusama-rpc.polkadot.io/',
  transactionUrl: 'https://polkascan.io/pre/kusama-cc3/transaction',
  unit: 'KSM',
};

export const LOCALHOST_NETWORK = {
  text: 'Localhost',
  value: 'localhost',
  networkURL: 'ws://127.0.0.1',
  networkPort: '9944',
  networkFullUrl: 'ws://127.0.0.1:9944',
  unit: 'DOT',
};

export const DOT_NETWORK_LIST = [ALEXANDER_NETWORK, KUSAMA_NETWORK];

export const DEV_DOT_NETWORK_LIST = [ALEXANDER_NETWORK, KUSAMA_NETWORK, LOCALHOST_NETWORK];

export const DEFAULT_NETWORK = KUSAMA_NETWORK;
// Custom Network Validation

export const CUSTOM = 'custom';
export const HTTPS = 'https';
export const HTTP = 'http';
export const LOCALHOST = 'localhost';
export const WS = 'ws';
export const WSS = 'wss';
export const DEFAULT_NON_SSL_PORT = '9944';
export const DEFAULT_SSL_PORT = '443';
