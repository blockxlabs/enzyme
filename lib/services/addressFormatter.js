export const shortenAddress = address => `${address.slice(0, 6)}...${address.substr(address.length - 4)}`;

export function removeZeroX(data) {
  return data.slice(0, 2) === '0x' ? data.slice(2, data.length) : data;
}

export function addZeroX(data) {
  return data.slice(0, 2) !== '0x' ? `0x${data}` : data;
}

export const getWalletAlias = (walletArr, addressToLookup) => {
  const walletFound = walletArr.find(wallet => wallet.address === addressToLookup);

  return walletFound === undefined ? 'Unknown Contact' : walletFound.alias;
};

export async function getDecryptedWalletData() {
  return {};
}

export async function importWallet() {
  return {};
}

export function renameWallet() {
  return {};
}
