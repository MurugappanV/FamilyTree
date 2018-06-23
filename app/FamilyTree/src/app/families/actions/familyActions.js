import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { familiesByUserIdQuery } from '../graphql/queries';

export function uploadingImageUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.UPLOADING_FAMILY_IMG_PIC});
    }
}

export const getFamilyByUserId = (userId) => {
    return (dispatch, getState) => {
        dispatch({type: types.FAMILY_DETAILS_LOADING});
        client.resetStore()
        client.query({
            query: familiesByUserIdQuery,
            variables: {id: userId}
        }).then((resp) => {
            if (resp.data) {
                dispatch({type: types.FAMILY_DETAILS_LOADED, data: resp.data.allFamilies});
            }
            if(resp.errors) {
                dispatch({ type: types.FAMILY_DETAILS_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}