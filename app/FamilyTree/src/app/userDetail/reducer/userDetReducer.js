import createReducer from '../../common/lib/createReducer';
import *  as types from '../../common/redux/types';
import *  as generalConstants from '../../../common/constants/generalConstants';

export const profilePicUrl = createReducer(null, {
    [types.SET_PROFILE_URL](state, action) {
         return action.data;
    },
    [types.CLEAR_PROFILE_URL](state, action) {
        return null;
   },
});

export const profilePicUploadStatus = createReducer(0, {
    [types.UPLOADING_PROFILE_PIC](state, action) {
         return generalConstants.LOADING;
    },[types.UPLOADED_PROFILE_PIC](state, action) {
        return generalConstants.LOADED;
    },[types.ERROR_UPLOADING_PROFILE_PIC](state, action) {
        return generalConstants.ERROR;
    },[types.CLEAR_PROFILE_URL](state, action) {
        return 0;
    },
});