export const CHANGE_CURRENT_NETWORK = 'NETWORK/CHANGE_CURRENT';
export const UPDATE_NETWORK_LIST = 'NETWORK/UPDATE_LIST';
export const SHOW_NETWORK_LIST = 'NETWORK/SHOW_LIST';

export function updateNetworkList(networks) {
  return {
    type: UPDATE_NETWORK_LIST,
    payload: networks,
  };
}

export function changeCurrentNetwork(network) {
  return {
    type: CHANGE_CURRENT_NETWORK,
    payload: network,
  };
}

export function showNetworks(flag) {
  return {
    type: SHOW_NETWORK_LIST,
    payload: flag,
  };
}
