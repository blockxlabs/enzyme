import { convertUnit } from '../../../lib/services/unitConverter';

const assert = require('assert');

describe('Unit Converter', () => {
  it('should convert correct value for bigger unit to smaller unit', () => {
    const newValue = convertUnit('1000', 'DOT', 'micro');
    assert.equal('1000000000', newValue, 'Result should be match with mock Result');
  });
  it('should convert correct value for smaller unit to bigger unit', () => {
    const newValue = convertUnit('1000000000', 'micro', 'DOT');
    assert.equal('1000', newValue, 'Result should be match with mock Result');
  });
  it('should throw error of value must be in string', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit(1000, 'DOT', 'micro');
    } catch (err) {
      assert.equal('value must be in string', err.message, 'value must be in string');
    }
  });
  it('should throw error of From Unit is not supported', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit('1000', 'xyz', 'micro');
    } catch (err) {
      assert.equal('From Unit is not supported', err.message, 'From Unit is not supported');
    }
  });
  it('should throw error of To Unit is not supported', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit('1000', 'DOT', 'xyz');
    } catch (err) {
      assert.equal('To Unit is not supported', err.message, 'To Unit is not supported');
    }
  });
});
