import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

export const familyPicUrl = createReducer(null, {
    [types.SET_FAMILY_IMG_URL](state, action) {
         return action.data;
    },
    [types.CLEAR_FAMILY_IMG_URL](state, action) {
        return null;
   },
});

export const familyPicUploadStatus = createReducer(0, {
    [types.UPLOADING_FAMILY_IMG_PIC](state, action) {
         return generalConstants.LOADING;
    },[types.UPLOADED_FAMILY_IMG_PIC](state, action) {
        return generalConstants.LOADED;
    },[types.ERROR_UPLOADING_FAMILY_IMG_PIC](state, action) {
        return generalConstants.ERROR;
    },[types.CLEAR_FAMILY_IMG_URL](state, action) {
        return 0;
    },
});

const initialAddFamily = {
    addFamilyLoadingStatus: 0,
    addFamilys: {}
}

export const addFamilyDetail = createReducer(initialAddFamily, {
    [types.ADD_FAMILY_LOADING](state, action) {
         return {
             ...state,
             addFamilyLoadingStatus: generalConstants.LOADING,
         }
    },
    [types.ADD_FAMILY_LOADED](state, action) {
        return {
            ...state,
            addFamilys: action.data,
            addFamilyLoadingStatus: generalConstants.LOADED,
        };
    },
    [types.ADD_FAMILY_ERROR](state, action) {
        return {
            ...state,
            addFamilyLoadingStatus: generalConstants.ERROR,
        };
    },
    [types.CLEAR_ADD_FAMILY](state, action) {
        return initialAddFamily;
    },
});