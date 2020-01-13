import { getAddreesBookState, updateAddressBook } from './store/address-book-store';
import * as status from '../../lib/constants/api';

// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

export const duplicate = {
  status: status.DUPLICATE_ALIAS,
  message: 'duplicate Address',
};

export const isNewAddress = address => {
  const { addressBook } = getAddreesBookState();
  const duplicateAddress = addressBook.find(x => x.address === address);
  if (duplicateAddress) {
    return { isNewAddress: false };
  }
  return { isNewAddress: true };
};

export const validateContact = contact => {
  const { addressBook } = getAddreesBookState();
  if (addressBook.length > 0) {
    const duplicateAddress = addressBook.find(x => x.address === contact.address);
    if (duplicateAddress) {
      throw new Error('Duplicate Address');
    }
    const duplicateName = addressBook.find(
      x => x.fname === contact.fname.trim() && x.lname === contact.lname.trim(),
    );
    if (duplicateName) {
      throw new Error('Duplicate name');
    }
  }
};

export const submitContact = contact => {
  validateContact(contact);
  const { addressBook } = getAddreesBookState();
  const newAddreesBook = [...addressBook, { ...contact }];
  const result = updateAddressBook(newAddreesBook);
  return { result, ...success };
};

export const getContacts = () => {
  const { addressBook } = getAddreesBookState();
  return { addressBook };
};

export const removeContact = async contact => {
  // get privious accounts
  const { address, fname } = contact;
  const { addressBook } = getAddreesBookState();
  const filteredAddressBook = addressBook.filter(x => x.address !== address || x.fname !== fname);

  // update reducer state
  await updateAddressBook(filteredAddressBook);

  return true;
};
