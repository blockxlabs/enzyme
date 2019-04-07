import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = applyMiddleware(thunk);
const enhancer = compose(middlewares);

export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
