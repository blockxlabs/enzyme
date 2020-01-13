import { convertUnit } from '../../../backgroundScript/services/unit-converter';

const assert = require('assert');

describe('Unit Converter', () => {
  it('should convert correct value for Yotta unit to femto unit', () => {
    const newValue = convertUnit('1', 'Yotta', 'femto');
    assert.equal(
      '1000000000000000000000000000000000000000',
      newValue,
      'Result should be match with mock Result',
    );
  });
  it('should convert correct value for Mega unit to femto unit', () => {
    const newValue = convertUnit('1', 'Mega', 'femto');
    assert.equal('1000000000000000000000', newValue, 'Result should be match with mock Result');
  });
  it('should convert correct value for bigger unit to smaller unit', () => {
    const newValue = convertUnit('130', 'milli', 'femto');
    assert.equal('130000000000000', newValue, 'Result should be match with mock Result');
  });
  it('should convert correct value for bigger unit to smaller unit', () => {
    const newValue = convertUnit('1000', 'micro', 'femto');
    assert.equal('1000000000000', newValue, 'Result should be match with mock Result');
  });
  it('should convert correct value for smaller unit to bigger unit', () => {
    const newValue = convertUnit('1000000000', 'nano', 'femto');
    assert.equal('1000000000000000', newValue, 'Result should be match with mock Result');
  });
  it('should throw error of value must be in string', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit(1000, 'Unit', 'femto');
    } catch (err) {
      assert.equal('value must be in string', err.message, 'value must be in string');
    }
  });
  it('should throw error of From Unit is not supported', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit('1000', 'xyz', 'femto');
    } catch (err) {
      assert.equal('From Unit is not supported', err.message, 'From Unit is not supported');
    }
  });
  it('should throw error of To Unit is not supported', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newValue = convertUnit('1000', 'Unit', 'xyz');
    } catch (err) {
      assert.equal('To Unit is not supported', err.message, 'To Unit is not supported');
    }
  });
});
