//

const KUSAMA_CHAIN = {
  name: 'Kusama',
  genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  icon: 'polkadot',
  specVersion: 1056,
  ss58Format: 2,
  tokenDecimals: 12,
  tokenSymbol: 'KSM',
  types: {
    Keys: 'SessionKeys5',
  },
};
const WESTEND_CHAIN = {
  name: 'Westend',
  genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
  icon: 'polkadot',
  specVersion: 41,
  ss58Format: 42,
  tokenDecimals: 12,
  tokenSymbol: 'WND',
  types: {},
};

const EDGEWARE_CHAIN = {
  name: 'Edgeware',
  genesisHash: '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b',
  icon: 'substrate',
  specVersion: 31,
  ss58Format: 7,
  tokenSymbol: 'EDG',
  tokenDecimals: 18,
};

const BERESHEET_CHAIN = {
  name: 'Beresheet',
  genesisHash: '0x67640d4c0087ed6b8d3d7654b7df557a0d14e470ce7b0ec0c0ba0e4d0ce2f5e8',
  icon: 'substrate',
  specVersion: 38,
  ss58Format: 42,
  tokenDecimals: 18,
  tokenSymbol: 'tEDG',
  types: {},
};
export const CHAIN = [WESTEND_CHAIN, KUSAMA_CHAIN, EDGEWARE_CHAIN, BERESHEET_CHAIN];
export const findChain = genesisHash => {
  const selectedChain = CHAIN.find(x => x.genesisHash === genesisHash);
  return selectedChain;
};

export const findChainByName = name => {
  const selectedChain = CHAIN.find(x => x.name === name);
  return selectedChain;
};
