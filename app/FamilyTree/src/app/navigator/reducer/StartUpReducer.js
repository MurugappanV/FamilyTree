import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as GeneralConstants from '../../../common/constants/generalConstants';

export const startUpStatus = createReducer(0, {
    [types.START_UP_USER_ID_LOADING](state, action) {
         return GeneralConstants.LOADING;
    },
    [types.START_UP_USER_ID_LOADED](state, action) {
        return GeneralConstants.LOADED;
    },
    [types.START_UP_USER_ID_ERROR](state, action) {
        return GeneralConstants.ERROR;
    },
});
