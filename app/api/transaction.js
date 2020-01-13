import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const getTransactionFee = async (txnType, toAddress) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_TXN_FEE,
    txnType,
    toAddress,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const submitTransaction = async transferDetails => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_TXN_SUBMIT,
    transaction: transferDetails,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getTransactions = async (network, address, txnHash) => {
  const { result } = await sendMessage({
    type: MessageTypes.BG_TXN_LIST,
    network,
    address,
    txnHash,
  });
  if (result) {
    return { result };
  }
  return { result: [] };
};

export const getTransaction = async (network, address, txnHash) => {
  const { result } = await sendMessage({
    type: MessageTypes.BG_TXN_GET,
    network,
    address,
    txnHash,
  });
  if (result) {
    return { result };
  }
  return { result: {} };
};

export const confirmTransaction = async transaction => {
  const { result, message, status } = await sendMessage({
    type: MessageTypes.BG_TXN_CONFIRM,
    transaction,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const isNewAddress = async address => {
  const { result, message, status } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_IS_NEW_ADDRESS,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
