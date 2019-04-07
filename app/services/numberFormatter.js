/* eslint-disable */
import BigNumber from 'bignumber.js';

// Change config format for token market details on dashboard.
import BigNumberDetails from 'bignumber.js';

/* eslint-enable */

const DOT_DECIMAL_PLACES = 18;
const NAMP_DECIMAL_PLACES = 9;
const NANO_DOT_DECIMAL_PLACES = 9;

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

/**
 * user when input does not have decimal places i.e. 1.23 is invalid but 123 is valid
 * @param {int128 value} value
 */
export const convertBNToDOT = value => {
  throwErrorIfDecimalExists(
    value,
    `Unexpected number containing decimal places. ${value.toString()}`,
  );
  throwIfLargeNumber(value);
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(-1 * DOT_DECIMAL_PLACES);
  }

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(-1 * DOT_DECIMAL_PLACES);
};

/**
 * Input can be String, BigNumber, Number, Double
 * NRG Price is in nAMP
 * Returns BigNumber value
 */
export const convertNRGPriceToDOT = value => {
  /* eslint-disable valid-typeof */
  throwErrorIfDecimalExists(
    value,
    `Unexpected number containing decimal places. ${value.toString()}`,
  );
  const shiftBy = DOT_DECIMAL_PLACES - NAMP_DECIMAL_PLACES;
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(-1 * shiftBy);
  }

  const bnValue = new BigNumber(value);
  return bnValue.shiftedBy(-1 * shiftBy); // resolves -1 * 9
};

export const convertDOTToNanoAmp = value => {
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(DOT_DECIMAL_PLACES);
  }

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(DOT_DECIMAL_PLACES);
};

export const convertNanoAmpToDOT = value => {
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(-1 * DOT_DECIMAL_PLACES);
  }

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(-1 * DOT_DECIMAL_PLACES);
};

export const convertDOTToAmp = value => {
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(NANO_DOT_DECIMAL_PLACES);
  }

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(NANO_DOT_DECIMAL_PLACES);
};

export const convertNanoAmpToAmp = value => {
  if (BigNumber.isBigNumber(value)) {
    return value.shiftedBy(-NAMP_DECIMAL_PLACES);
  }

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(-NAMP_DECIMAL_PLACES);
};

export const convertBNToNumber = (value, decimalPlaces) => {
  if (BigNumber.isBigNumber(value)) {
    return value.decimalPlaces(decimalPlaces).toNumber();
  }

  return new BigNumber(value).decimalPlaces(decimalPlaces).toNumber();
};

/* eslint-disable-next-line */
export const convertBNToString = (value, decimalPlaces) => convertBNToNumber(value, decimalPlaces)
  .toFixed(decimalPlaces)
  .toString();

export const convertStringToBNT = (value, decimals) => {
  throwIfLargeNumber(value);

  const bnValue = BigNumber(value);
  return bnValue.shiftedBy(1 * decimals);
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
  value = convertBNToNumber(value, 2);
  BigNumberDetails.config({ FORMAT: format });
  return new BigNumberDetails(value).toFormat(2);
};

export const convertNumberToFormattedString = (value, decimals = 4) => {
  if (BigNumber.isBigNumber(value)) {
    value = convertBNToNumber(value, decimals);
  }
  value = Number(value.toString().replace(/,/g, '')); // remove comma
  // eslint-disable-next-line one-var
  let integerPart,
    fractionalPart,
    outInteger,
    outFractional,
    retVal;
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

export const convertValueToUSD = (tokenValue, usdPrice) => {
  const bnTokenValue = BigNumber(tokenValue);
  const bnUsdPrice = BigNumber(usdPrice);
  const usdValue = bnUsdPrice.times(bnTokenValue);
  return convertNumberToFormattedString(usdValue);
};
