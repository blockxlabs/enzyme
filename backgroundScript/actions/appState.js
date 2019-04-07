export const APP_STATE_ONBOARDING = 'APP_STATE/ONBOARDING';
export const APP_STATE_READY = 'APP_STATE/READY';
export const APP_STATE_HAS_CONNECTIVITY = 'APP_STATE/HAS_CONNECTIVITY';
export const APP_STATE_SET_HASH_KEY = 'APP_STATE/SET_HASH_KEY';

export const appStateSetHashKey = hashKey => ({
  hashKey,
  type: APP_STATE_SET_HASH_KEY,
});

export const appStateReady = () => ({
  ready: true,
  type: APP_STATE_READY,
});
