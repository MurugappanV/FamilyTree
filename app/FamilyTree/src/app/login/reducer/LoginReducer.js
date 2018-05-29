import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as GeneralConstants from '../../../common/constants/generalConstants';

export const userRegisteredPhoneNumber = createReducer('', {
    [types.SET_PHONE_NUMBER](state, action) {
         return action.data;
    },
});

export const userId = createReducer(null, {
    [types.SET_USER_ID](state, action) {
         return action.data;
    },
    [types.CLEAR_USER_ID](state, action) {
        return null;
   },
});

export const isGraphcoolTokenObtained = createReducer(0, {
    [types.GRAPHCOOL_AUTH_TOKEN_OBTAINED](state, action) {
         return GeneralConstants.LOADED;
    },
    [types.GRAPHCOOL_AUTH_TOKEN_ERROR](state, action) {
        return GeneralConstants.ERROR;
    },
    [types.GRAPHCOOL_AUTH_TOKEN_CLEAR](state, action) {
        return 0;
    },
});