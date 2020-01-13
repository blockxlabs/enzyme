import { getStore } from '../../store/store-provider';
import { updateAddressBookList } from '../../actions/address-book';

export const getAddreesBookState = () => {
  const { addressBookState } = getStore().getState();
  return { ...addressBookState };
};

export const updateAddressBook = addreesBook => getStore().dispatch(updateAddressBookList(addreesBook));
