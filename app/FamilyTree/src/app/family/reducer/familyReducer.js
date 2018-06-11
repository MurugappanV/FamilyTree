import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

const initialFamilyDetails = {
    familyDetailsStatus: 0,
    familyDetails: null
}

export const familyDetail = createReducer(initialFamilyDetails, {
    [types.GET_FAMILY_LOADING](state, action) {
         return {
             ...state,
             familyDetailsStatus: generalConstants.LOADING,
         }
    },
    [types.GET_FAMILY_LOADED](state, action) {
        return {
            ...state,
            familyDetails: action.data,
            familyDetailsStatus: generalConstants.LOADED,
        };
    },
    [types.GET_FAMILY_ERROR](state, action) {
        return {
            ...state,
            familyDetailsStatus: generalConstants.ERROR,
        };
    },
    [types.CLEAR_GET_FAMILY](state, action) {
        return initialFamilyDetails;
    },
});