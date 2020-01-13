import { BigNumber } from 'bignumber.js';
import { getUnits } from '../apis/chain';

const validate = (value, name) => {
  if (value !== undefined) {
    if (typeof value !== 'string' && !(value instanceof String)) {
      throw new Error(`${name} must be in string`);
    }
  } else {
    throw new Error(`${name} is undefined`);
  }
};

export const convertUnit = (value, fromUnit, toUnit) => {
  validate(value, 'value');
  validate(fromUnit, 'fromUnit');
  validate(toUnit, 'toUnit');
  const bnValue = new BigNumber(value);
  const units = getUnits();
  const foundFromUnit = units.find(x => x.text === fromUnit);
  if (foundFromUnit === undefined) {
    throw new Error('From Unit is not supported');
  }
  const foundToUnit = units.find(x => x.text === toUnit);
  if (foundToUnit === undefined) {
    throw new Error('To Unit is not supported');
  }
  const power = foundFromUnit.power - foundToUnit.power;
  const exponential = new BigNumber(10).pow(new BigNumber(power));
  const newValue = bnValue.multipliedBy(exponential);
  return newValue.toFixed();
};
