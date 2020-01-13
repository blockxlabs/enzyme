import { sendMessage } from '../../lib/services/extension/messages';
import * as MessageTypes from '../../lib/constants/message-types';
import * as ResponseTypes from '../../lib/constants/response-types';
import * as status from '../../lib/constants/api';

// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

//return a sucess ...
export const success = {
  status: status.SUCCESS,
  message: 'success',
};

export const handleDefault = data => {
  const out = {
    ...failure,
    message: 'Wrong request type.',
    type: ResponseTypes.BG_DAPP_RESPONSE,
  };
  window.postMessage(out, data.metadata.origin);
};

export const handleError = (err, data) => {
  const out = {
    ...failure,
    message: err.message,
    type: ResponseTypes.BG_DAPP_RESPONSE,
  };
  window.postMessage(out, data.metadata.origin);
};

export const authorizeDApp = async data => {
  const response = await sendMessage({
    ...data,
    type: MessageTypes.BG_DAPP_AUTHORIZE,
  });
  if (response.result !== undefined || response.status === status.FAILURE) {
    const out = {
      ...response,
      type: ResponseTypes.BG_DAPP_RESPONSE,
    };
    window.postMessage(out, '*');
  }
};

export const dAppResponse = async request => {
  const out = {
    ...request,
  };
  window.postMessage(out, '*');
};

export const submitTransaction = async data => {
  const response = await sendMessage({
    ...data,
    type: MessageTypes.BG_DAPP_TXN_VALIDATE,
  });
  if (response.result !== undefined || response.status === status.FAILURE) {
    const out = {
      ...response,
      type: ResponseTypes.BG_DAPP_RESPONSE,
    };
    window.postMessage(out, data.metadata.origin);
  }
};

export const signMessage = async data => {
  const response = await sendMessage({
    ...data,
    type: MessageTypes.BG_DAPP_SIGN_MESSAGE,
  });
  if (response.result !== undefined || response.status === status.FAILURE) {
    const out = {
      ...response,
      type: ResponseTypes.BG_DAPP_RESPONSE,
    };
    window.postMessage(out, data.metadata.origin);
  }
};

export const getAccounts = async data => {
  const response = await sendMessage({
    ...data,
    type: MessageTypes.BG_DAPP_GET_ACCOUUNTS,
  });
  if (response.result !== undefined || response.status === status.FAILURE) {
    const out = {
      ...response,
      type: ResponseTypes.BG_DAPP_RESPONSE,
    };
    window.postMessage(out, data.metadata.origin);
  }
};

export const handleDefaultResponse = request => {
  const out = {
    ...failure,
    message: 'Something went wrong.',
    type: ResponseTypes.BG_DAPP_RESPONSE,
  };
  window.postMessage(out, request.origin);
};
