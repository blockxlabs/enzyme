export const DOT_NETWORK_LIST = [
  {
    text: 'Alexander',
    value: 'polkadot',
    networkURL: 'wss://poc3-rpc.polkadot.io/',
    networkPort: '',
    networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
    transactionUrl: 'https://polkadot.js.org/apps/#/explorer'
  },
  {
    text: 'Charred Cherry',
    value: 'substrate',
    networkURL: 'wss://substrate-rpc.parity.io/',
    networkPort: '',
    networkFullUrl: 'wss://substrate-rpc.parity.io/',
    transactionUrl: 'https://polkadot.js.org/apps/#/explorer'
  },
  {
    text: 'Localhost',
    value: 'localhost',
    networkURL: 'ws://127.0.0.1',
    networkPort: '9944',
    networkFullUrl: 'ws://127.0.0.1:9944'
  },
  {
    text: 'Custom',
    value: 'custom',
    networkURL: 'ws://localhost',
    networkPort: '9944',
    networkFullUrl: 'ws://localhost:9944'
  }
];

export const NETWORKS = {
  Alexander: 0,
  Charred_Cherry: 1
};
