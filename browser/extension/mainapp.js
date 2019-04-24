import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import { updateApplicationState } from '../../app/services/watcherService';

const { state } = {};
const initialState = JSON.parse(state || '{}');

const createStore = require('../../app/store/configureStore');

const store = createStore(initialState);
ReactDOM.render(<Root store={store} />, document.querySelector('#root'));

updateApplicationState(store);
