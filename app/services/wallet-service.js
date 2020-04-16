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

export function renameWallet(value, currentWallet, currenIndex, walletArr) {
  const valueIndex = walletArr.findIndex(wallet => value === wallet.alias);
  const walletIndex = walletArr.findIndex(wallet => currentWallet.address === wallet.address);

  if (value.length < 1) {
    throw new Error('Wallet name must be at least 1 character long.');
  }

  if (value.length > 16) {
    throw new Error('Wallet name can not exceed 16 characters.');
  }

  if (valueIndex !== -1 && valueIndex !== currenIndex) {
    throw new Error(`"${value}" already exists.`);
  }

  if (valueIndex === currenIndex) {
    return undefined;
  }

  const walletToEdit = {
    ...currentWallet,
    alias: value,
  };

  // Remove Current Wallet from array
  walletArr.splice(walletIndex, 1, walletToEdit);

  return walletArr;
}

export function shortenName(str, limit = 12) {
  if (str.length > limit) {
    return `${str.substr(0, limit - 1)}...`;
  }
  return str;
}

export function trimUrl(url, limit = 40) {
  if (url.length > limit) {
    return `${url.substr(0, limit - 10)}...${url.substr(url.length - 10, 10)}`;
  }
  return url;
}

export function createAccountObject(accountArr, address) {
  return {
    address,
    alias: getWalletAlias(accountArr, address),
  };
}

export function createTxnUI(result) {
  return [
    { label: 'From', value: result.url },
    { label: 'Chain', value: result.chain },
    { label: 'Version', value: result.sVersion },
    { label: 'Nonce', value: result.nonce },
    { label: 'Method', value: result.method },
    { label: 'Fees', value: result.transferFee },
    // TODO MM: Remove for now because we are showing incorrect
    // { label: 'Value', value: result.transferAmount },
    // { label: 'Total Value', value: result.totalTransferAmount },
    { label: 'Info', value: result.note },
    { label: 'Lifetime', value: result.mortality },
  ];
}
