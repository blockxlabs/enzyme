import * as Types from '../constants/address-book';

const initialState = {
  // array of contact object
  addressBook: [],
  toAddress: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_ADDRESS_BOOK_LIST:
      return {
        ...state,
        addressBook: action.addressBook,
      };
    case Types.SET_TO_ADDRESS:
      return { ...state, toAddress: action.toAddress };
    default:
      return state;
  }
};

export default reducer;
