import * as Types from './actionTypes';

const initialState = {
  success: false,
  error: null,
  seedWords: '',
};

const reducer = (state = { initialState }, action) => {
  switch (action.type) {
    case Types.SET_HASH_KEY_SUCCESS:
      return {
        ...state,
        ...{
          success: true,
        },
      };
    case Types.SET_SEED_WORDS:
      return {
        ...state,
        ...{ seedWords: action.seedWords },
      };
    case Types.SET_ONBOARDING_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
