export const CHANGE_CURRENT_NETWORK = 'CHANGE_CURRENT_NETWORK';
export const UPDATE_NETWORK_LIST = 'UPDATE_NETWORK_LIST';
export const SHOW_NETWORK_LIST = 'SHOW_NETWORK_LIST';

export function updateNetworkList(_networks) {
  return {
    type: UPDATE_NETWORK_LIST,
    payload: _networks,
  };
}

export function changeCurrentNetwork(_network) {
  return {
    type: CHANGE_CURRENT_NETWORK,
    payload: _network,
  };
}

export function showNetworks(_flag) {
  return {
    type: SHOW_NETWORK_LIST,
    payload: _flag,
  };
}
