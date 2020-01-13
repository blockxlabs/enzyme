import * as DotWallet from '../apis/core-polkadot/dot-wallet';
import * as KsmWallet from '../apis/core-kusama/ksm-wallet';
import * as CustomWallet from '../apis/core-custom/custom-wallet';

import { getCurrentNetwork } from './network-service';
import { KUSAMA_NETWORK, ALEXANDER_NETWORK } from '../../lib/constants/networks';

export const getWallet = () => {
  const currentNetwork = getCurrentNetwork();
  switch (currentNetwork.value) {
    case KUSAMA_NETWORK.value:
      return KsmWallet;
    case ALEXANDER_NETWORK.value:
      return DotWallet;
    default:
      return CustomWallet;
  }
};

export const getWalletByChain = chain => {
  switch (chain) {
    case KUSAMA_NETWORK.text:
      return KsmWallet;
    case ALEXANDER_NETWORK.text:
      return DotWallet;
    default:
      return CustomWallet;
  }
};
