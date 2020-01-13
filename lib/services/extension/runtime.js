const extension = require('extensionizer');

export const getID = () => {
  const { id } = extension.runtime;
  try {
    return id;
  } catch (e) {
    throw new Error('Unable to get runtime extension ID.');
  }
};
