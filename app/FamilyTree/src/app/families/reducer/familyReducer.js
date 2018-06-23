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

const initialFamilyDetail = {
    familyDetailLoadingStatus: 0,
    familyList: []
}

export const familyList = createReducer(initialFamilyDetail, {
    [types.FAMILY_DETAILS_LOADING](state, action) {
         return {
             ...state,
             familyDetailLoadingStatus: generalConstants.LOADING,
         }
    },
    [types.FAMILY_DETAILS_LOADED](state, action) {
        return {
            ...state,
            familyList: action.data,
            familyDetailLoadingStatus: generalConstants.LOADED,
        };
    },
    [types.FAMILY_DETAILS_ERROR](state, action) {
        return {
            ...state,
            familyDetailLoadingStatus: generalConstants.ERROR,
        };
    },
    [types.CLEAR_FAMILY_DETAILS](state, action) {
        return initialFamilyDetail;
    },
});