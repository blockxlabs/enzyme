export const WESTEND_NETWORK = {
  text: 'Westend',
  value: 'Westend',
  networkURL: 'wss://westend-rpc.polkadot.io',
  networkPort: '',
  networkFullUrl: 'wss://westend-rpc.polkadot.io',
  transactionUrl: 'https://westend.subscan.io/extrinsic',
  //faucetUrl: 'https://faucets.blockxlabs.com/',
  //faucetText: 'Universal Faucet (at BlockX Labs).',
  unit: 'WND',
};

export const KUSAMA_NETWORK = {
  text: 'Kusama',
  value: 'Kusama',
  networkURL: 'wss://kusama-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://kusama-rpc.polkadot.io/',
  transactionUrl: 'https://kusama.subscan.io/extrinsic',
  unit: 'KSM',
};

export const EDGEWARE_NETWORK = {
  text: 'Edgeware',
  value: 'Edgeware',
  networkURL: 'wss://mainnet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://mainnet1.edgewa.re/',
  transactionUrl: 'https://edgeware.subscan.io/extrinsic',
  unit: 'EDG',
};

export const BERESHEET_NETWORK = {
  text: 'Beresheet',
  value: 'Beresheet',
  networkURL: 'wss://beresheet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://beresheet1.edgewa.re/',
  //transactionUrl: 'https://beresheet.subscan.io/extrinsic',
  unit: 'tEDG',
};

export const LOCALHOST_NETWORK = {
  text: 'Localhost',
  value: 'localhost',
  networkURL: 'ws://127.0.0.1',
  networkPort: '9944',
  networkFullUrl: 'ws://127.0.0.1:9944',
  unit: 'DOT',
};

export const DOT_NETWORK_LIST = [EDGEWARE_NETWORK, KUSAMA_NETWORK];

export const DEV_DOT_NETWORK_LIST = [
  BERESHEET_NETWORK,
  EDGEWARE_NETWORK,
  KUSAMA_NETWORK,
  WESTEND_NETWORK,
  LOCALHOST_NETWORK,
];

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
