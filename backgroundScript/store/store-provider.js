const store = require('./configure-store')({});

export const getStore = () => store;

export const setStore = () => {
  throw new Error('Not Implemented yet !');
};
