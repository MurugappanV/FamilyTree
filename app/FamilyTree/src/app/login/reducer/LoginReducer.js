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

const initialUserDetail = {
    userDetailLoadingStatus: 0,
    userDetails: {}
}

export const userProfileDetail = createReducer(initialUserDetail, {
    [types.USER_DETAILS_LOADING](state, action) {
         return {
             ...state,
             userDetailLoadingStatus: GeneralConstants.LOADING,
         }
    },
    [types.USER_DETAILS_LOADED](state, action) {
        return {
            ...state,
            userDetails: action.data,
            userDetailLoadingStatus: GeneralConstants.LOADED,
        };
    },
    [types.USER_DETAILS_ERROR](state, action) {
        return {
            ...state,
            userDetailLoadingStatus: GeneralConstants.ERROR,
        };
    },
    [types.CLEAR_USER_DETAILS](state, action) {
        return initialUserDetail;
    },
});