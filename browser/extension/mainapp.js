import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import { updateApplicationState } from '../../app/services/watcher-service';

const { state } = {};
const initialState = JSON.parse(state || '{}');

const createStore = require('../../app/store/configure-store');

const store = createStore(initialState);
ReactDOM.render(<Root store={store} />, document.querySelector('#root'));

updateApplicationState(store);
