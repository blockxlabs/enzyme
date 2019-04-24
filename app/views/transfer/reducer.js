import * as Types from './actionTypes';

const initialState = {
  transferDetails: {},
  transferFee: '0',
  transferAmount: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COIN_TRANSFER_DETAILS:
      return {
        ...state,
        ...{
          transferDetails: action.transferDetails,
        },
      };
    case Types.CLEAR_COIN_TRANSFER_DETAILS:
      return {
        ...state,
        ...{
          transferDetails: {},
        },
      };
    case Types.UPDATE_TRANSFER_FEE:
      return {
        ...state,
        ...{
          transferFee: action.transferFee,
        },
      };
    case Types.UPDATE_TRANSFER_AMOUNT:
      return {
        ...state,
        ...{
          transferAmount: action.transferAmount,
        },
      };
    default:
      return state;
  }
};

export default reducer;
