import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import {  } from '../graphql/queries';

export function uploadingImageUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.UPLOADING_FAMILY_IMG_PIC});
    }
}