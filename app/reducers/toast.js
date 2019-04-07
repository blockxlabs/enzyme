import { CREATE_TOAST } from '../constants/toast';

const initialState = {
  toastOptions: null,
};

const toast = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOAST:
      return { ...state, toastOptions: action.payload };
    default:
      return state;
  }
};

export default toast;
