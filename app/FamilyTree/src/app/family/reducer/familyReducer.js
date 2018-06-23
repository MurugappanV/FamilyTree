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
            familyStatisticData: getFamilyStatisticData(action.data),
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

function getFamilyStatisticData(family) {
    return [{
            label: "Members",
            count: family.totalCount.count
        },{
            label: "Male",
            count: family.maleCount.count
        },{
            label: "Female",
            count: family.femaleCount.count
        },{
            label: "Married",
            count: family.marriedCount.count
        },{
            label: "Youngsters",
            count: family.unmarriedCount.count
        }
    ]
}


