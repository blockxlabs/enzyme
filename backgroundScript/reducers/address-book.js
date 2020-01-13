import { UPDATE_ADDRESS_BOOK_LIST } from '../actions/address-book';

const initialState = {
  // array of contact object
  addressBook: [],
};

const addressBookState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS_BOOK_LIST:
      return {
        ...state,
        addressBook: action.payload,
      };
    default:
      return state;
  }
};

export default addressBookState;
