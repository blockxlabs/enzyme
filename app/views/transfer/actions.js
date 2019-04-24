import BigNumber from 'bignumber.js';
import * as Types from './actionTypes';
import { Transaction } from '../../api';
import { TRANSFER_COINS } from '../../../lib/constants/transaction';
import { units, baseUnit, dotUnit } from '../../../lib/constants/units';
import { convertUnit } from '../../../lib/services/unitConverter';

const dispatchSetTransferDetails = (
  {
    from, to, alias, unit, value
  },
  transferFee,
  transferAmount,
  totalTransferAmount,
  network,
) => ({
  type: Types.COIN_TRANSFER_DETAILS,
  transferDetails: {
    txnType: TRANSFER_COINS,
    metadata: {
      from,
      to,
      value,
      unit,
      alias,
      transferFee,
      transferAmount,
      totalTransferAmount,
    },
    internal: { address: from, network },
  },
});

export const clearTransferDetails = () => ({
  type: Types.CLEAR_COIN_TRANSFER_DETAILS,
});

export const updateTransferFee = transferFee => ({
  type: Types.UPDATE_TRANSFER_FEE,
  transferFee,
});

export const updateTransferAmount = transferAmount => ({
  type: Types.UPDATE_TRANSFER_AMOUNT,
  transferAmount,
});

export const setTransferDetails = details => (dispatch, getState) => {
  const { transferFee, transferAmount } = getState().transferReducer;
  const { network } = getState().networkReducer;
  const transferFeeBN = new BigNumber(transferFee);
  const transferAmountBN = new BigNumber(transferAmount);
  const totalAmount = transferFeeBN.plus(transferAmountBN).toString();
  const transferAmountInDot = convertUnit(transferAmount, baseUnit.text, dotUnit.text);
  const transferFeeInmDOT = convertUnit(transferFee, baseUnit.text, units[7].text);
  const totalAmountInDot = convertUnit(totalAmount, baseUnit.text, dotUnit.text);
  dispatch(
    dispatchSetTransferDetails(
      details,
      transferFeeInmDOT,
      transferAmountInDot,
      totalAmountInDot,
      network,
    ),
  );
};

export const setTransferFee = to => async dispatch => {
  const { result: transferFee } = await Transaction.getTransactionFee(TRANSFER_COINS, to);
  dispatch(updateTransferFee(transferFee));
};

export const setTransferAmount = (value, fromUnit) => async dispatch => {
  const amount = convertUnit(value, fromUnit.text, baseUnit.text);
  dispatch(updateTransferAmount(amount));
};
