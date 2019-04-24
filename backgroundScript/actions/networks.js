export const UPDATE_CURRENT_NETWORK = 'NETWORK/UPDATE_CURRENT';

export function updateCurrentNetwork(network) {
  return {
    type: UPDATE_CURRENT_NETWORK,
    payload: network,
  };
}
