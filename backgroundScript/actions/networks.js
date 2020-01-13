export const UPDATE_CURRENT_NETWORK = 'NETWORK/UPDATE_CURRENT';
export const UPDATE_DEVELOPER_MODE = 'NETWORK/UPDATE_DEVELOPER_MODE';

export function updateCurrentNetwork(network) {
  return {
    type: UPDATE_CURRENT_NETWORK,
    payload: network,
  };
}

export function updateDeveloperMode(isDeveloperMode) {
  return {
    type: UPDATE_DEVELOPER_MODE,
    payload: isDeveloperMode,
  };
}
