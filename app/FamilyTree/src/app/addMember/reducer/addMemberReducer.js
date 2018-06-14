import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

export const addMemPicUrl = createReducer(null, {
    [types.SET_ADD_MEM_IMG_URL](state, action) {
         return action.data;
    },
    [types.CLEAR_ADD_MEM_IMG_URL](state, action) {
        return null;
   },
});

export const addMemPicUploadStatus = createReducer(0, {
    [types.UPLOADING_ADD_MEM_IMG_PIC](state, action) {
         return generalConstants.LOADING;
    },[types.UPLOADED_ADD_MEM_IMG_PIC](state, action) {
        return generalConstants.LOADED;
    },[types.ERROR_UPLOADING_ADD_MEM_IMG_PIC](state, action) {
        return generalConstants.ERROR;
    },[types.CLEAR_ADD_MEM_IMG_URL](state, action) {
        return 0;
    },
});

const initialAddMemDetail = {
    addMemLoadingStatus: 0,
    addMemMsg: null
}

export const addMemDet = createReducer(initialAddMemDetail, {
    [types.UPLOADING_ADD_MEM](state, action) {
         return {
            ...state,
             addMemMsg: null,
             addMemLoadingStatus: generalConstants.LOADING,
         }
    },
    [types.UPLOADED_ADD_MEM](state, action) {
        return {
            ...state,
            addMemMsg: action.data,
            addMemLoadingStatus: generalConstants.LOADED,
        };
    },
    [types.ERROR_ADD_MEM](state, action) {
        return {
            ...state,
            addMemMsg: action.data,
            addMemLoadingStatus: generalConstants.ERROR,
        };
    },
    [types.CLEAR_ADD_MEM](state, action) {
        return initialAddMemDetail;
    },
});