import { LOCALHOST_REGEX, URL_VALIDATION_REGEX, PROTOCOL_OF_URL } from '../constants/regex';
import * as NetworkProtocol from '../constants/networks';
import { isFirefox } from './browser';

const withProtocol = url => (PROTOCOL_OF_URL.test(url) ? url : `${NetworkProtocol.WS}://${url}`);

const hasSSL = protocol => protocol === `${NetworkProtocol.HTTPS}:` || protocol === `${NetworkProtocol.WSS}:`;

export const createFullNetworkURL = url => {
  const urlWithProtocol = withProtocol(url.trim());
  if (urlWithProtocol.match(LOCALHOST_REGEX) === null) {
    if (urlWithProtocol.match(URL_VALIDATION_REGEX) === null) {
      throw new Error('Invalid URL.');
    }
  }
  const urlObj = new URL(urlWithProtocol);
  if (isFirefox() && !hasSSL(urlObj.protocol)) {
    throw new Error('Invalid URL.');
  }
  let networkPort = urlObj.port;
  if (networkPort === '' && !hasSSL(urlObj.protocol)) {
    networkPort = NetworkProtocol.DEFAULT_NON_SSL_PORT;
  }
  if (networkPort === '' && hasSSL(urlObj.protocol)) {
    networkPort = NetworkProtocol.DEFAULT_SSL_PORT;
  }

  return {
    networkURL: `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`,
    networkPort,
    networkFullUrl: `${urlObj.protocol}//${urlObj.hostname}:${networkPort}${urlObj.pathname}`,
  };
};
