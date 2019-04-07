import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';

const { state } = {};
const initialState = JSON.parse(state || '{}');

const createStore = require('../../app/store/configureStore');

ReactDOM.render(<Root store={createStore(initialState)} />, document.querySelector('#root'));
