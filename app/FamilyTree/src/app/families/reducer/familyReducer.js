import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

export const family = createReducer(null, {
    [types.SET_FAMILY_IMG_URL](state, action) {
         return action.data;
    },
    [types.CLEAR_FAMILY_IMG_URL](state, action) {
        return null;
   },
});