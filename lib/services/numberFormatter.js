/**
 *  { power: -24, value: 'y', text: 'yocto' },
    { power: -21, value: 'z', text: 'zepto' },
    { power: -18, value: 'a', text: 'atto' },
    { power: -15, value: 'f', text: 'femto' },
    { power: -12, value: 'p', text: 'pico' },
    { power: -9, value: 'n', text: 'nano' },
    { power: -6, value: 'µ', text: 'micro' },
    { power: -3, value: 'm', text: 'milli' },
    { power: 0, value: '-', text: 'Unit' }, // position 8
    { power: 3, value: 'k', text: 'Kilo' },
    { power: 6, value: 'M', text: 'Mega' },
    { power: 9, value: 'G', text: 'Giga' },
    { power: 12, value: 'T', text: 'Tera' },
    { power: 15, value: 'P', text: 'Peta' },
    { power: 18, value: 'E', text: 'Exa' },
    { power: 21, value: 'Z', text: 'Zeta' },
    { power: 24, value: 'Y', text: 'Yotta' }

    From : https://github.com/polkawallet-io/polkawallet-RN/blob/master/src/util/si.ts
 */
/* eslint-disable */
import BigNumber from 'bignumber.js';

const throwErrorIfDecimalExists = (value, msg) => {
  if (BigNumber.isBigNumber(value)) {
    if (value.dp() !== 0) throw new Error(msg);
    return;
  }
  const str = value.toString();
  if (str.indexOf('.') !== -1) throw new Error(msg);
};

/**
 * If Number / Double type is huge
 * i.e. 123456789123456789 then it coverts to 123456789123456780 which is wrong
 */
const throwIfLargeNumber = value => {
  if (typeof value === 'number' && value.toString().length >= 18) {
    throw new Error('Large number passed as Number or Float and causing overflow');
  }
};
