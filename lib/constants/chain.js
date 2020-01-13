const KUSAMA_CHAIN = {
  name: 'Kusama',
  genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  icon: 'polkadot',
  specVersion: 1028,
  ss58Format: 2,
  tokenDecimals: 12,
  tokenSymbol: 'KSM',
  types: {
    Keys: 'SessionKeys5',
  },
};
const ALEXANDER_CHAIN = {
  name: 'Alexander',
  genesisHash: '0xdcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b',
  icon: 'polkadot',
  specVersion: 112,
  ss58Format: 42,
  tokenDecimals: 15,
  tokenSymbol: 'DOT',
  types: {},
};

export const CHAIN = [ALEXANDER_CHAIN, KUSAMA_CHAIN];
export const findChain = genesisHash => {
  const selectedChain = CHAIN.find(x => x.genesisHash === genesisHash);

  return selectedChain;
};

export const findChainByName = name => {
  const selectedChain = CHAIN.find(x => x.name === name);
  return selectedChain;
};
