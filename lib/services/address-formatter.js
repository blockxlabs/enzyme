export const shortenAddress = address => `${address.slice(0, 6)}...${address.substr(address.length - 4)}`;

export function removeZeroX(data) {
  return data.slice(0, 2) === '0x' ? data.slice(2, data.length) : data;
}

export function addZeroX(data) {
  return data.slice(0, 2) !== '0x' ? `0x${data}` : data;
}
