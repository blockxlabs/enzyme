import { injectExtension } from '@polkadot/extension-inject';
import { resolveRequest } from './messaging/in-page';
import * as RequestTypes from '../lib/constants/request-types';
import AppConfig from '../lib/constants/config';

const metadata = {
  url: window.location.host,
};
const getAccounts = async () => {
  const result = await resolveRequest(RequestTypes.GET_ACCOUNTS, {}, metadata);
  return result;
};

const signTransaction = async payload => {
  const result = await resolveRequest(RequestTypes.SEND, payload, metadata);
  return result;
};

// eslint-disable-next-line no-unused-vars
const signMessage = async payload => {
  const result = await resolveRequest(RequestTypes.SIGN_MESSAGE, payload, metadata);
  return result;
};

const enable = async origin => {
  const metadata = {
    origin,
    url: window.location.host,
  };
  await resolveRequest(RequestTypes.ENABLE, { origin }, metadata);
  return {
    accounts: {
      get: async () => {
        const res = await getAccounts();
        return res;
      },
    },
    name: AppConfig.name,
    signer: {
      signPayload: async payload => {
        const res = await signTransaction(payload);
        return res;
      },
      signRaw: async payload => {
        const res = await signMessage(payload);
        return res;
      },
    },
    sign: {
      signMessage: async payload => {
        const res = await signMessage(payload);
        return res;
      },
    },
    version: AppConfig.version,
  };
};

injectExtension(enable, {
  name: AppConfig.name,
  version: AppConfig.version,
});
