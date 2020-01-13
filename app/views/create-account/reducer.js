import * as Types from './action-types';
import { KEYPAIR_EDWARDS, KEYPAIR_TYPES } from '../../../lib/constants/api';

const initialState = {
  success: false,
  aliasError: null,
  error: null,
  keypairType: KEYPAIR_EDWARDS,
  keypairTypes: KEYPAIR_TYPES,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_SUCCESS:
      return {
        ...state,
        ...{
          success: true,
        },
      };
    case Types.CREATE_FIRST_ACCOUNT_SEED_PHRASE_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };
    case Types.CREATE_DUPLICATE_ALIAS_ERROR:
      return {
        ...state,
        ...{
          aliasError: action.error,
        },
      };
    case Types.UPDATE_KEYPAIR_TYPE:
      return {
        ...state,
        ...{
          keypairType: action.keypairType,
        },
      };
    default:
      return state;
  }
};

export default reducer;
