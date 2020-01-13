import { SI, findSi } from '@polkadot/util/format/si';

// remove 'yocto','zepto','atto';
const femtoUnit = findSi('f');
export const units = SI.filter(x => x.power >= femtoUnit.power);

export const baseUnit = units[0];
export const dotUnit = units[5];
