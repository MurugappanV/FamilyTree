import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { createFamily } from '../graphql/quries';
import { familiesByUserIdQuery } from '../../families/graphql/queries';

export function setFamilyPicUrl(familyPicUrl) {
    return (dispatch, getState) => {
        if(familyPicUrl != null) {
            dispatch({type: types.SET_FAMILY_IMG_URL, data: familyPicUrl});
            dispatch({type: types.UPLOADED_FAMILY_IMG_PIC});
        } else {
            dispatch({type: types.CLEAR_FAMILY_IMG_URL});
        }
    }
}

export function clearFamilyPicUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.CLEAR_FAMILY_IMG_URL});
    }
}

export function uploadingImageUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.UPLOADING_FAMILY_IMG_PIC});
    }
}

export function saveFamilyDetails(userId, name, photoUrl) {
    return (dispatch, getState) => {
        // console.log(`${userId}----${name}----${email}----${photoUrl}----${phoneNumber}----${dob}`)
        dispatch({type: types.ADD_FAMILY_LOADING});
        client.mutate({
            mutation: createFamily,
            variables: {name: name, photoUrl: photoUrl, createById: userId, usersIds: userId}
        }).then((resp) => {
            if (resp.data) {
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
                })
                dispatch({type: types.ADD_FAMILY_LOADED, data: resp.data.createFamily});
            }
            if(resp.errors) {
                 dispatch({ type: types.ADD_FAMILY_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}