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

const initialUserCloseRelation = {
    userCloseRelationStatus: 0,
    userCloseRelation: null
}

export const userCloseRelation = createReducer(initialUserCloseRelation, {
    [types.GET_FAMILY_LOADING](state, action) {
         return {
             ...state,
             userCloseRelationStatus: generalConstants.LOADING,
         }
    },
    [types.GET_FAMILY_LOADED](state, action) {
        return {
            ...state,
            userCloseRelation: getUserCloseRelation(action.data),
            userCloseRelationStatus: generalConstants.LOADED,
        };
    },
    [types.GET_FAMILY_ERROR](state, action) {
        return {
            ...state,
            userCloseRelationStatus: generalConstants.ERROR,
        };
    },
    [types.CLEAR_GET_FAMILY](state, action) {
        return initialUserCloseRelation;
    },
});

function getUserCloseRelation(userRelation) {
    return {
        id: userRelation.id,
        name: userRelation.name,
        gender: userRelation.gender,
        dateOfBirth: userRelation.dateOfBirth,
        email: userRelation.email,
        phoneNumber: userRelation.phoneNumber,
        photoUrl: userRelation.photoUrl,
        father: !userRelation.father ? null : {
            id: userRelation.father.id,
            name: userRelation.father.name,
            gender: userRelation.father.gender,
            photoUrl: userRelation.father.photoUrl,
        },
        mother: (!userRelation.father || !userRelation.father.wife[0]) ? null : {
            id: userRelation.father.wife[0].id,
            name: userRelation.father.wife[0].name,
            gender: userRelation.father.wife[0].gender,
            photoUrl: userRelation.father.wife[0].photoUrl
        },
        husband: userRelation.gender == "MALE" ? (!userRelation.wife[0] ? null : {
            id: userRelation.id,
            name: userRelation.name,
            gender: userRelation.gender,
            photoUrl: userRelation.photoUrl,
        }) : !userRelation.husband[0] ? null : {
            id: userRelation.husband[0].id,
            name: userRelation.husband[0].name,
            gender: userRelation.husband[0].gender,
            photoUrl: userRelation.husband[0].photoUrl,
        },
        wife: userRelation.gender == "FEMALE" ? (!userRelation.husband[0] ? null : {
            id: userRelation.id,
            name: userRelation.name,
            gender: userRelation.gender,
            photoUrl: userRelation.photoUrl,
        }) : (!userRelation.wife[0] ? null : {
            id: userRelation.wife[0].id,
            name: userRelation.wife[0].name,
            gender: userRelation.wife[0].gender,
            photoUrl: userRelation.wife[0].photoUrl,
        }),
        children: userRelation.child.map(child => {
            return {
                id: child.id,
                name: child.name,
                gender: child.gender,
                photoUrl: child.photoUrl,
            }
        }),
        siblings: !userRelation.father ? [] : userRelation.father.child.map(child => {
            return {
                id: child.id,
                name: child.name,
                gender: child.gender,
                photoUrl: child.photoUrl,
            }
        }),
    }
}