import { BAD_REQUEST } from '../constants/api';

export const validateAddress = address => {
  if (address === undefined || address === null || address === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires address.',
    };
  }
};
export const validateData = data => {
  if (data === undefined || data === null || data === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires data.',
    };
  }
};
export const validateDappTxnObject = transaction => {
  if (transaction === undefined || transaction === null || transaction === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires transaction.',
    };
  }
  const { url, txnPayload } = transaction;

  if (url === undefined || url === null || url === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires url.',
    };
  }

  if (txnPayload === undefined || txnPayload === null || txnPayload === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires transaction payload.',
    };
  }
  const {
    address, blockHash, blockNumber, genesisHash, method, specVersion
  } = txnPayload;
  const vAddress = validateAddress(address);
  if (vAddress) return vAddress;

  if (blockHash === undefined || blockHash === null || blockHash === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires blockHash.',
    };
  }
  if (blockNumber === undefined || blockNumber === null || blockNumber === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires blockNumber.',
    };
  }
  if (genesisHash === undefined || genesisHash === null || genesisHash === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires genesisHash.',
    };
  }
  if (method === undefined || method === null || method === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires method.',
    };
  }
  if (specVersion === undefined || specVersion === null || specVersion === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires specVersion.',
    };
  }
};

export const validateTxnObject = transaction => {
  const {
    to, account, amount, unit, txnType
  } = transaction;

  const vAddress = validateAddress(account.address);
  if (vAddress) return vAddress;

  const toAddress = validateAddress(to);
  if (toAddress) return toAddress;

  if (amount === undefined || amount === null || amount === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires amount.',
    };
  }

  if (unit === undefined || unit === null || unit === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires unit.',
    };
  }

  if (txnType === undefined || txnType === null || txnType === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires txnType.',
    };
  }
};
