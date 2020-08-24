import { getWallet } from './wallet-service';
import * as status from '../../lib/constants/api';
import * as dapp from '../apis/dapp';
import * as AccountService from './account-service';
import * as PermissionService from './permission-service';
import * as ExtensionApi from '../../lib/services/extension/extension';
import * as ResponseType from '../../lib/constants/response-types';
import * as DappTransactionService from './dapp-transaction-service';
import { validateData } from '../../lib/services/validation-service';
import { getAccountState } from './store/account-store';

// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

export const enableResponse = {
  accounts: {},
  name: 'enzyme',
  signer: {},
  version: '0.0.1',
};

export const isAuthorized = async () => false;

export const sendPopupResponse = (data, sender, sendResponse) => {
  if (sender.url === ExtensionApi.getURL('popup.html')) {
    sendResponse(data);
  }
};
const showDAppPopup = async data => {
  let prevDAppMetadata = data;
  const window = await dapp.showPopup(prevDAppMetadata ? prevDAppMetadata.window : undefined);
  prevDAppMetadata = await dapp.getMetaData();
  prevDAppMetadata.window = window;
  await dapp.setMetadata(prevDAppMetadata);
};

export const closeRequest = async id => {
  try {
    const { requests, window } = await dapp.getMetaData();
    requests.forEach((request, index) => {
      if (request.id === id) {
        requests.splice(index, 1);
      }
    });
    if (requests.length === 0) {
      await dapp.setMetadata(undefined);
    }
    await dapp.closePopup(window);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in close request');
  }
};

export const closeRequestAndReplyDApp = async (requestID, replyData) => {
  // In order avoid message port being disconnected, always reply to dapp after closing request.
  await closeRequest(requestID);
  await dapp.reply(replyData);
};

const queueDAppRequests = async (data, sender, result) => {
  const request = {
    request: data,
    sender,
    id: `_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    result,
  };
  const metaData = await dapp.getMetaData();
  if (metaData && metaData.requests) {
    return undefined;
  }
  const requests = [];
  requests.push(request);
  await dapp.setMetadata({ requests });
  await showDAppPopup({ requests });
};

export const getDAppRequests = async () => {
  const metaData = await dapp.getMetaData();
  if (metaData && metaData.requests) {
    return metaData.requests;
  }
  return undefined;
};

export const authorizeDApp = async (data, sender) => {
  const {
    metadata: { url },
  } = data;
  const isDAppAuthorized = await PermissionService.getDAppIsAuthorized({ url });
  const result = {
    account: undefined,
  };

  const { accounts } = await AccountService.getAccounts();
  if (accounts.length === 0) {
    throw new Error('No account found');
  }

  if (!isDAppAuthorized) {
    await queueDAppRequests(data, sender, result);
    return undefined;
  }
  return enableResponse;
};

export const whitelistDApp = async data => {
  const {
    request: {
      id: requestID,
      request: {
        metadata: { url, origin },
      },
      sender: {
        tab: { id },
      },
    },
  } = data;
  await PermissionService.updateDAppWhiteList({ url });
  const { accounts } = await AccountService.getAccounts();
  if (accounts.length === 0) {
    throw new Error('No account found');
  }
  const replyData = {
    id,
    message: {
      ...success,
      result: enableResponse,
      origin,
      type: ResponseType.BG_DAPP_RESPONSE,
    },
  };
  return { result: true, requestID, replyData };
};

export const cancelRequest = async data => {
  const {
    request: {
      id: requestID,
      request: {
        metadata: { origin },
      },
      sender: {
        tab: { id },
      },
    },
  } = data;
  const replyData = {
    id,
    message: {
      ...failure,
      message: 'The request was cancelled.',
      origin,
      type: ResponseType.BG_DAPP_RESPONSE,
    },
  };
  return { result: true, requestID, replyData };
};

export const getAccountsForDapp = async data => {
  const {
    metadata: { url },
  } = data;
  const isDAppAuthorized = await PermissionService.getDAppIsAuthorized({ url });
  if (isDAppAuthorized) {
    const accountState = getAccountState();
    const accounts = AccountService.accountForDapp(accountState);
    return accounts;
  }
  throw new Error('Unauthorized Access');
};

export const validateTransaction = async (transactionObj, sender) => {
  const {
    metadata: { url },
    opts,
  } = transactionObj;
  const isDAppAuthorized = await PermissionService.getDAppIsAuthorized({ url });
  if (!isDAppAuthorized) {
    throw new Error('Unauthorized access.');
  }
  // update network connection
  const network = await DappTransactionService.setNetwork(opts);

  const { address } = opts;
  const account = AccountService.getAccount(address);
  const transaction = {
    address,
    txnType: 'TRANSFER_COINS',
  };
  const validationObj = {
    url,
    txnPayload: opts,
    network,
  };
  const result = await DappTransactionService.validateDappTransaction(validationObj);
  await queueDAppRequests(transactionObj, sender, {
    account,
    transaction,
    ...result,
  });
  return undefined;
};

export const signMessage = async (signdata, sender) => {
  const {
    metadata: { url },
    opts: { address, data },
  } = signdata;
  const isDAppAuthorized = await PermissionService.getDAppIsAuthorized({ url });
  if (!isDAppAuthorized) {
    throw new Error('Unauthorized access.');
  }
  const wallet = getWallet();
  const message = wallet.getStringMessageFromHex(data);
  if (!message) {
    throw new Error('Message not found.');
  }
  const account = AccountService.getAccount(address);
  const accountForUi = AccountService.getAccountForUI(account);
  const result = {
    account: accountForUi,
    message: { message },
  };
  await queueDAppRequests(signdata, sender, result);
  return undefined;
};

export const getSignMessage = async data => {
  const vData = validateData(data);
  if (vData) {
    return vData;
  }
  const {
    request: {
      id: requestID,
      request: {
        metadata: { origin },
      },
      sender: {
        tab: { id },
      },
      result: signMessageObj,
    },
  } = data;
  const { account, message } = signMessageObj;
  const wallet = getWallet();
  const accountWithSeed = AccountService.getAccount(account.address);
  const {
    message: { signedMessage },
  } = await wallet.getSignMessage(accountWithSeed, message);
  const replyData = {
    id,
    message: {
      ...success,
      result: { signature: signedMessage },
      origin,
      type: ResponseType.BG_DAPP_RESPONSE,
    },
  };
  return { result: true, requestID, replyData };
};
