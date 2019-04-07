const store = require('./configureStore')({});

export const getStore = () => store;

export const setStore = () => {
  throw new Error('Not Implemented yet !');
};
