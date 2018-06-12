import * as types from '../../common/redux/types';
import {createUser} from '../graphql/quries';
import client from '../../common/redux/apollo/client';

export function setProfilePicUrl(profilePicUrl) {
    return (dispatch, getState) => {
        if(profilePicUrl != null) {
            dispatch({type: types.SET_ADD_MEM_IMG_URL, data: profilePicUrl});
            dispatch({type: types.UPLOADED_ADD_MEM_IMG_PIC});
        } else {
            dispatch({type: types.CLEAR_ADD_MEM_IMG_URL});
        }
    }
}

export function clearProfilePicUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.CLEAR_ADD_MEM_IMG_URL});
    }
}

export function clearAddUser() {
    return (dispatch, getState) => {
        dispatch({type: types.CLEAR_ADD_MEM});
        dispatch({type: types.CLEAR_ADD_MEM_IMG_URL});
    }
}

export function uploadingImageUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.UPLOADING_ADD_MEM_IMG_PIC});
    }
}

export function addUser(phoneNumber, name, email, photoUrl, dob, address, gender, familiesIds) {
    return (dispatch, getState) => {
        // console.log(`${userId}----${name}----${email}----${photoUrl}----${phoneNumber}----${dob}`)
        dispatch({type: types.UPLOADING_ADD_MEM});
        client.mutate({
            mutation: createUser,
            variables: {phoneNumber: phoneNumber, name: name, email: email, photoUrl: photoUrl, dateOfBirth: dob, address: address, gender: gender, familiesIds: familiesIds}
        }).then((resp) => {
            if (resp.data.createUser) {
                dispatch({type: types.UPLOADED_ADD_MEM, data: "Successfuly Added"});
            }
            if(resp.errors) {
                let message = "Sorry, unexpected error !!!"
                if(errors.message.includes('unique constraint')) {
                    message = "Phone number already exist"
                }
                dispatch({ type: types.ERROR_ADD_MEM, data: message});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}