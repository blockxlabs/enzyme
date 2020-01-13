import { SI } from '@polkadot/util/format/si';

const units = SI.filter(x => x.power >= -15);
const Unit = {
  units,
  baseUnit: { power: -15, value: 'f', text: 'femto' },
  symbolUnit: null,
};
export const getUnits = () => units;

export const getBaseUnit = () => Unit.baseUnit;
