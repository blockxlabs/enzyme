import * as Types from './action-types';

const initialState = {
  confirmDetails: {},
  error: null,
  success: false,
  isToAddressError: false,
  toAddressErrorMessage: null,
  isAmountError: false,
  toAmountErrorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.COIN_TRANSFER_DETAILS:
      return {
        ...state,
        ...{
          confirmDetails: action.confirmDetails,
        },
      };
    case Types.CLEAR_COIN_TRANSFER_DETAILS:
      return {
        ...state,
        ...{
          confirmDetails: {},
        },
      };
    case Types.CONFIRM_TRANSFER_SUCCESS:
      return {
        ...state,
        ...{
          success: action.success,
        },
      };
    case Types.CONFIRM_TRANSFER_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };

    case Types.SET_TRANSFER_VALIDATION_ERROR:
      if (action.error) {
        return {
          ...state,
          ...{
            isToAddressError: action.error.isToAddressError,
            toAddressErrorMessage: action.error.toAddressErrorMessage,
            isAmountError: action.error.isAmountError,
            toAmountErrorMessage: action.error.toAmountErrorMessage,
          },
        };
      }
      return {
        ...state,
        ...{
          isToAddressError: false,
          toAddressErrorMessage: null,
          isAmountError: false,
          toAmountErrorMessage: null,
        },
      };

    default:
      return state;
  }
};

export default reducer;
