export const CONFIRM_TRANSACTION = {
  txnType: 'TRANSFER_COINS',
  metadata: {
    account: { address: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH' },
    to: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    amount: '1',
    unit: { power: -3, value: 'm', text: 'milli' },
    fAmount: '1000000000000',
    fees: {
      transactionBaseFee: '1000000000000',
      transferFee: '1000000000000',
      bytesFee: '1370000000000',
      creationFee: '1000000000000',
      totalFee: '4370000000000',
    },
    transferFee: '4.370m Unit',
    transferAmount: '1.000m Unit',
    totalTransferAmount: '5.370m Unit',
  },
  internal: {
    address: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    network: { value: 'Alexander' },
  },
};

export const CONFIRM_TRANSACTION_ADDRESS_ERROR = {
  isAmountError: false,
  isError: true,
  isToAddressError: true,
  toAddressErrorMessage: 'Invalid Address',
  toAmountErrorMessage: null,
};

export const CONFIRM_TRANSACTION_AMOUNT_ERROR = {
  isAmountError: true,
  isError: true,
  isToAddressError: false,
  toAddressErrorMessage: null,
  toAmountErrorMessage: 'Insufficient Balance',
};
export const FEES = {
  transactionBaseFee: '1000000000000',
  transferFee: '1000000000000',
  bytesFee: '1370000000000',
  creationFee: '1000000000000',
  totalFee: '4370000000000',
};

export const SUBMIT_TRANSACTION = {
  date: '2019-05-30T15:57:02-04:00',
  internal: {
    address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
    network: {
      faucetText: 'Universal Faucet (at BlockX Labs).',
      faucetUrl: 'https://faucets.blockxlabs.com/',
      networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
      networkPort: '',
      networkURL: 'wss://poc3-rpc.polkadot.io/',
      text: 'Alexander',
      transactionUrl: 'https://polkascan.io/pre/alexander/system/extrinsic',
      value: 'polkadot',
    },
  },
  metadata: {
    account: {
      address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
      alias: 'sr25519',
      keypairType: 'sr25519',
    },
    amount: '2',
    fAmount: '2',
    fees: {
      bytesFee: '1370000000000',
      creationFee: '0',
      totalFee: '3370000000000',
      transactionBaseFee: '1000000000000',
      transferFee: '1000000000000',
    },
    to: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    totalTransferAmount: '3.370m DOT',
    transferAmount: '2.000f DOT',
    transferFee: '3.370m DOT',
    unit: { power: -15, value: 'f', text: 'femto' },
  },
  status: 'PENDING',
  txnHash: '0x27fd96752483e78e06b9a1e84d3a1250114e49dd9e8be845b99a795b3895db65',
  txnType: 'TRANSFER_COINS',
};

export const SUBMITED_SUCCESS_TRANSACTION = {
  date: '2019-05-30T15:57:02-04:00',
  internal: {
    address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
    network: {
      faucetText: 'Universal Faucet (at BlockX Labs).',
      faucetUrl: 'https://faucets.blockxlabs.com/',
      networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
      networkPort: '',
      networkURL: 'wss://poc3-rpc.polkadot.io/',
      text: 'Alexander',
      transactionUrl: 'https://polkascan.io/pre/alexander/system/extrinsic',
      value: 'polkadot',
    },
  },
  metadata: {
    account: {
      address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
      alias: 'sr25519',
      keypairType: 'sr25519',
    },
    amount: '2',
    fAmount: '2',
    fees: {
      bytesFee: '1370000000000',
      creationFee: '0',
      totalFee: '3370000000000',
      transactionBaseFee: '1000000000000',
      transferFee: '1000000000000',
    },
    to: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    totalTransferAmount: '3.370m DOT',
    transferAmount: '2.000f DOT',
    transferFee: '3.370m DOT',
    unit: { power: -15, value: 'f', text: 'femto' },
  },
  status: 'SUCCESS',
  txnHash: '0x27fd96752483e78e06b9a1e84d3a1250114e49dd9e8be845b99a795b3895db65',
  txnType: 'TRANSFER_COINS',
};

export const SUBMITED_FAIL_TRANSACTION = {
  date: '2019-05-30T15:57:02-04:00',
  internal: {
    address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
    network: {
      faucetText: 'Universal Faucet (at BlockX Labs).',
      faucetUrl: 'https://faucets.blockxlabs.com/',
      networkFullUrl: 'wss://poc3-rpc.polkadot.io/',
      networkPort: '',
      networkURL: 'wss://poc3-rpc.polkadot.io/',
      text: 'Alexander',
      transactionUrl: 'https://polkascan.io/pre/alexander/system/extrinsic',
      value: 'polkadot',
    },
  },
  metadata: {
    account: {
      address: '5D2RgkSCXrFJpMa54CakuMhHsyVE96iouvRVtStRrwmh7JYE',
      alias: 'sr25519',
      keypairType: 'sr25519',
    },
    amount: '2',
    fAmount: '2',
    fees: {
      bytesFee: '1370000000000',
      creationFee: '0',
      totalFee: '3370000000000',
      transactionBaseFee: '1000000000000',
      transferFee: '1000000000000',
    },
    to: '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH',
    totalTransferAmount: '3.370m DOT',
    transferAmount: '2.000f DOT',
    transferFee: '3.370m DOT',
    unit: { power: -15, value: 'f', text: 'femto' },
  },
  status: 'SUCCESS',
  txnHash: '0x27fd96752483e78e06b9a1e84d3a1250114e49dd9e8be845b99a795b3895db65',
  txnType: 'TRANSFER_COINS',
};
