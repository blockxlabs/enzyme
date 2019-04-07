import { HYDRATE_APP } from '../constants/hydrate';
import rootReducer from './index';

const hydrateAppReducer = (state = {}, action) => (action.type === HYDRATE_APP ? action.payload : rootReducer(state, action));

export default hydrateAppReducer;
