import CryptoJS from 'crypto-js';

const extension = require('extensionizer');

export function encrypt(value, hashKey) {
  const recipher = CryptoJS.AES.encrypt(JSON.stringify(value), hashKey);
  return recipher;
}

export function decrypt(cipher, hashKey) {
  const bytes = CryptoJS.AES.decrypt(cipher, hashKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}

export function getLocalStorage(name) {
  const { local } = extension.storage;
  return new Promise((resolve, reject) => {
    local.get(name, result => {
      const err = extension.runtime.lastError;
      if (!err) {
        resolve(result);
      }
      reject(err);
    });
  });
}

function set(obj) {
  const { local } = extension.storage;
  return new Promise((resolve, reject) => {
    local.set(obj, () => {
      const err = extension.runtime.lastError;
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

export function setLocalStorage(name, value) {
  const obj = { [name]: value };
  return set(obj);
}

export function removeLocalStorage(name) {
  const { local } = extension.storage;
  return new Promise((resolve, reject) => {
    local.remove(name, () => {
      const err = extension.runtime.lastError;
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
}
