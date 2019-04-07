import { jsdom } from 'jsdom';
import hook from 'css-modules-require-hook';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.mockStore = configureMockStore([thunk]);

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});
