import { createFullNetworkURL } from '../../../lib/services/network-validator';

test('Get Network for valid url', async () => {
  const url = 'getenzyme.dev';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'ws://getenzyme.dev/',
    networkPort: '9944',
    networkFullUrl: 'ws://getenzyme.dev:9944/',
  };
  expect(result).toMatchObject(network);
});

test('Get Network for valid url', async () => {
  const url = 'getenzyme.dev:9966';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'ws://getenzyme.dev/',
    networkPort: '9966',
    networkFullUrl: 'ws://getenzyme.dev:9966/',
  };
  expect(result).toMatchObject(network);
});

test('Get Network for valid url', async () => {
  const url = 'getenzyme.dev:9966/apikey/';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'ws://getenzyme.dev/apikey/',
    networkPort: '9966',
    networkFullUrl: 'ws://getenzyme.dev:9966/apikey/',
  };
  expect(result).toMatchObject(network);
});

test('Get Network for valid url', async () => {
  const url = 'wss://192.168.0.198/path/?query=test';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'wss://192.168.0.198/path/',
    networkPort: '443',
    networkFullUrl: 'wss://192.168.0.198:443/path/',
  };
  expect(result).toMatchObject(network);
});
test('Get Network for valid url', async () => {
  const url = 'ws://192.168.0.198:8899/path/test';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'ws://192.168.0.198/path/test',
    networkPort: '8899',
    networkFullUrl: 'ws://192.168.0.198:8899/path/test',
  };
  expect(result).toMatchObject(network);
});
test('Get Network for valid url', async () => {
  const url = 'ws://192.168.0.198/path/test';
  const result = createFullNetworkURL(url);
  const network = {
    networkURL: 'ws://192.168.0.198/path/test',
    networkPort: '9944',
    networkFullUrl: 'ws://192.168.0.198:9944/path/test',
  };
  expect(result).toMatchObject(network);
});
test('Get Network for valid url', async () => {
  const url = 'ws://localhost:9494';
  const result = createFullNetworkURL(url);
  const network = {
    networkFullUrl: 'ws://localhost:9494/',
    networkPort: '9494',
    networkURL: 'ws://localhost/',
  };
  expect(result).toMatchObject(network);
});

test('Get Network for valid url', async () => {
  const url = 'wss://localhost:9494';
  const result = createFullNetworkURL(url);
  const network = {
    networkFullUrl: 'wss://localhost:9494/',
    networkPort: '9494',
    networkURL: 'wss://localhost/',
  };
  expect(result).toMatchObject(network);
});

test('Throw error for Invalid url', async () => {
  const url = 'http://getenzyme.dev:9966/apikey/';
  expect(() => createFullNetworkURL(url)).toThrowError('Invalid URL.');
});

test('Throw error for Invalid url', async () => {
  const url = 'https://getenzyme.dev:9944/apikey/';
  expect(() => createFullNetworkURL(url)).toThrowError('Invalid URL.');
});

test('Throw error for Invalid url', async () => {
  const url = 'https://getenzyme.dev:9966/apikey/';
  expect(() => createFullNetworkURL(url)).toThrowError('Invalid URL.');
});
