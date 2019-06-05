import * as types from './action-types';

const initialState = {
  isAgree: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TERMS_STORE_AGREE:
      return {
        ...state,
        ...{
          isAgree: action.isAgree,
        },
      };
    default:
      return state;
  }
};

export default reducer;
