import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

const initialFamilyDetails = {
    familyDetailsStatus: 0,
    familyDetails: null,
    familyStatisticData: []
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
            label: family.totalCount.count > 1 ? "Members" : "Member",
            count: family.totalCount.count,
            imgSource: require('../../../../assert/images/totalFamily.png')
        },{
            label: family.unmarriedCount.count > 1 ? "Youngsters" : "Youngster",
            count: family.unmarriedCount.count,
            imgSource: require('../../../../assert/images/youngsters.png')
        },{
            label: "Married",
            count: family.marriedCount.count,
            imgSource: require('../../../../assert/images/married.png')
        },{
            label: "Female",
            count: family.femaleCount.count,
            imgSource: require('../../../../assert/images/female.png')
        },{
            label: "Male",
            count: family.maleCount.count,
            imgSource: require('../../../../assert/images/male.png')
        }
    ]
}


