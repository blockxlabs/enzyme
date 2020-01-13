import * as AddressBookActionTypes from '../constants/address-book';

export const setToAddress = toAddress => ({
  type: AddressBookActionTypes.SET_TO_ADDRESS,
  toAddress,
});

export const updateToAddress = address => async dispatch => {
  dispatch(setToAddress(address));
};

export const resetToAddress = () => async dispatch => {
  dispatch(setToAddress(''));
};
