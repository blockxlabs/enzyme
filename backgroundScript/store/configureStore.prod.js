import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = applyMiddleware(thunk);
const enhancer = compose(middlewares);

// eslint-disable-next-line import/prefer-default-export

let store;

export default function getStore(initialState) {
  store = createStore(rootReducer, initialState, enhancer);
  return store;
}
