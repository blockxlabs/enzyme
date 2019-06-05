import * as Types from './action-types';

const initialState = {
  success: false,
  score: 0,
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
    case Types.UPDATE_PASSWORD_METER_SCORE:
      return {
        ...state,
        ...{
          score: action.score,
        },
      };
    default:
      return state;
  }
};

export default reducer;
