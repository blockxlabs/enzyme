const extension = require('extensionizer');

const WINDOW_HEIGHT = 625;
const WINDOW_WIDTH = 376;

export function create() {
  const { create } = extension.windows;
  const {
    screenX, screenY, outerWidth, outerHeight
  } = window;
  const windowTop = Math.round(screenY + outerHeight / 2 - WINDOW_HEIGHT / 2);
  const windowLeft = Math.round(screenX + outerWidth / 2 - WINDOW_WIDTH / 2);
  return new Promise((resolve, reject) => {
    try {
      create(
        {
          url: 'window.html',
          type: 'popup',
          height: WINDOW_HEIGHT,
          width: WINDOW_WIDTH,
          top: Math.max(windowTop, 0),
          left: Math.max(windowLeft, 0),
        },
        details => {
          resolve(details);
        },
      );
    } catch (e) {
      reject(e);
    }
  });
}

export function remove(id) {
  const { remove } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      remove(id, () => {
        resolve(1);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function get(id) {
  const { get } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      get(id, res => {
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getAll() {
  const { getAll } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      getAll({}, windows => {
        resolve(windows);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function update(id) {
  const { update } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      update(id, { focused: true }, result => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
}
