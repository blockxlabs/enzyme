import * as WndWallet from '../apis/core-westend/wnd-wallet';
import * as KsmWallet from '../apis/core-kusama/ksm-wallet';
import * as EdgWallet from '../apis/core-edgeware/edgeware-wallet';
import * as TEDGWallet from '../apis/core-beresheet/beresheet-wallet';
import * as CustomWallet from '../apis/core-custom/custom-wallet';

import { getCurrentNetwork } from './network-service';
import {
  KUSAMA_NETWORK,
  WESTEND_NETWORK,
  EDGEWARE_NETWORK,
  BERESHEET_NETWORK,
} from '../../lib/constants/networks';

export const getWallet = () => {
  const currentNetwork = getCurrentNetwork();
  switch (currentNetwork.value) {
    case KUSAMA_NETWORK.value:
      return KsmWallet;
    case WESTEND_NETWORK.value:
      return WndWallet;
    case EDGEWARE_NETWORK.value:
      return EdgWallet;
    case BERESHEET_NETWORK.value:
      return TEDGWallet;
    default:
      return CustomWallet;
  }
};

export const getWalletByChain = chain => {
  switch (chain) {
    case KUSAMA_NETWORK.text:
      return KsmWallet;
    case WESTEND_NETWORK.text:
      return WndWallet;
    case EDGEWARE_NETWORK.text:
      return EdgWallet;
    case BERESHEET_NETWORK.text:
      return TEDGWallet;
    default:
      return CustomWallet;
  }
};
