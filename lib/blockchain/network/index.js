export const TYPES = {
  BALANCE_TRANSFER: 0,
  NOMINATE: 1,
  UN_NONIMATE: 2,
  STAKE: 3,
  UNSTAKE: 4,
};

/**
 * List all extrinsic calls that can be mode for the blockchain
 * List is availabe @ https://poc-3.polkadot.io/#/extrinsics
 * Steps:
 * - Go to https://poc-3.polkadot.io/#/extrinsics
 * - Click on dropdown for 'submit the following extrinsic' and select an entity
 * - Dropdown next to has all the relevant functions that can be executed
 *
 * An alternate link to above one is @ https://poc-3.polkadot.io/#/toolbox
 */

// balances extrinsic
export const balanceTransfer = () => {};

// staking extrinsic
export const nominate = () => {};
export const unNominate = () => {};
export const stake = () => {};
export const unstake = () => {};
