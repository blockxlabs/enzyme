import { accountState } from './account';
import { networkState } from './network';
import { transactionState } from './transactions';

const store = jest.genMockFromModule('./store-provider.js');

const getState = () => ({ accountState, networkState, transactionState });
const subscribe = () => jest.fn();

store.getStore = () => ({ getState, subscribe });

export default store;
