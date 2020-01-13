export const UPDATE_ADDRESS_BOOK_LIST = 'ADDRESS_BOOK/UPDATE_LIST';

export function updateAddressBookList(addressBook) {
  return {
    type: UPDATE_ADDRESS_BOOK_LIST,
    payload: addressBook,
  };
}
