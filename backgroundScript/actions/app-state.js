export const APP_STATE_ONBOARDED = 'APP_STATE/ONBOARDED';
export const APP_STATE_READY = 'APP_STATE/READY';
export const APP_STATE_HAS_CONNECTIVITY = 'APP_STATE/HAS_CONNECTIVITY';
export const APP_STATE_SET_HASH_KEY = 'APP_STATE/SET_HASH_KEY';

export const appStateSetHashKey = hashKey => ({
  hashKey,
  type: APP_STATE_SET_HASH_KEY,
});

export const appStateReady = () => ({
  isAppReady: true,
  type: APP_STATE_READY,
});

export const appStateOnBoarded = isAppOnBoarded => ({
  isAppOnBoarded,
  type: APP_STATE_ONBOARDED,
});
