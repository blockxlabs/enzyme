/* eslint-disable */
import BigNumber from 'bignumber.js';

// Change config format for token market details on dashboard.
import BigNumberDetails from 'bignumber.js';

/**
 * Input can be String, BigNumber, Number, Double
 * NRG Price is in nAMP
 * Returns BigNumber value
 */
export const convertBNToNumber = (value, decimalPlaces) => {
  if (BigNumber.isBigNumber(value)) {
    return value.decimalPlaces(decimalPlaces).toNumber();
  }

  return new BigNumber(value).decimalPlaces(decimalPlaces).toNumber();
};

export const toFormat = value => {
  const format = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
  };
  const newValue = convertBNToNumber(value, 2);
  BigNumberDetails.config({ FORMAT: format });
  return new BigNumberDetails(newValue).toFormat(2);
};

export const convertNumberToFormattedString = (paramsValue, decimals = 2) => {
  let value;
  if (BigNumber.isBigNumber(paramsValue)) {
    value = convertBNToNumber(paramsValue, decimals);
  }
  value = Number(paramsValue.toString().replace(/,/g, '')); // remove comma
  let integerPart, fractionalPart, outInteger, outFractional, retVal;
  const decimalIndex = value.toString().indexOf('.');
  //if number contains decimal point then divide in two part integer and fractional
  if (decimalIndex > 0) {
    integerPart = value.toString().substring(0, decimalIndex);
    fractionalPart = value.toString().substring(decimalIndex + 1, decimalIndex + 1 + decimals);
    if (fractionalPart.length === 1) {
      fractionalPart += '0';
    }
  } else {
    integerPart = value.toString();
    fractionalPart = '00';
  }
  //if number is greater or equal then thousand, convert it to triplets
  //triplets = [ 'million - M', 'billion - B', 'trillion - T', 'quadrillion - P', 'quintillion - E', 'sextillion - Z', 'septillion - Y', 'octillion', 'nonillion'];
  if (Number(value) >= 1000) {
    const c = toFormat(value).match(new RegExp(',', 'g')).length;
    const index = toFormat(value).indexOf(',');
    outInteger = toFormat(value).substring(0, index);
    outFractional = toFormat(value).substring(index + 1, index + 1 + decimals);
    switch (c) {
      case 2:
        retVal = `${outInteger}.${outFractional}M`;
        break;
      case 3:
        retVal = `${outInteger}.${outFractional}B`;
        break;
      case 4:
        retVal = `${outInteger}.${outFractional}T`;
        break;
      case 5:
        retVal = `${outInteger}.${outFractional}P`;
        break;
      case 6:
        retVal = `${outInteger}.${outFractional}E`;
        break;
      case 7:
        retVal = `${outInteger}.${outFractional}Z`;
        break;
      case 8:
        retVal = `${outInteger}.${outFractional}Y`;
        break;
      default:
        retVal = `${Number(integerPart).toLocaleString('en')}.${fractionalPart}`;
    }
  } else if (integerPart.indexOf('e-') > 0) {
    // if number less than 1000 and contains e-(in sort, less than zero)
    retVal = Number(value).toFixed(decimals);
  } else {
    retVal = `${integerPart}.${fractionalPart}`;
  }
  return retVal;
};
