import * as types from '../../common/redux/types';
import {userByIdQuery, updateUser} from '../graphql/quries';
import client from '../../common/redux/apollo/client';

export function setProfilePicUrl(profilePicUrl) {
    return (dispatch, getState) => {
        if(profilePicUrl != null) {
            dispatch({type: types.SET_PROFILE_URL, data: profilePicUrl});
            dispatch({type: types.UPLOADED_PROFILE_PIC});
        } else {
            dispatch({type: types.CLEAR_PROFILE_URL});
        }
    }
}

export function clearProfilePicUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.CLEAR_PROFILE_URL});
    }
}

export function uploadingImageUrl() {
    return (dispatch, getState) => {
        dispatch({type: types.UPLOADING_PROFILE_PIC});
    }
}

export function saveUserDetails(userId, name, email, photoUrl, dob, address, gender) {
    return (dispatch, getState) => {
        // console.log(`${userId}----${name}----${email}----${photoUrl}----${phoneNumber}----${dob}`)
        dispatch({type: types.USER_DETAILS_LOADING});
        client.mutate({
            mutation: updateUser,
            variables: {id: userId, name: name, email: email, photoUrl: photoUrl, dateOfBirth: dob, address: address, gender: gender}
        }).then((resp) => {
            if (resp.data) {
                dispatch({type: types.USER_DETAILS_LOADED, data: resp.data.updateUser});
            }
            if(resp.errors) {
                 dispatch({ type: types.USER_DETAILS_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}

// export function getUserById(userId) {
//     return (dispatch, getState) => {
//         dispatch({type: types.USER_DETAILS_LOADING});
//         client.query({
//             query: userByIdQuery,
//             variables: {id: userId}
//         }).then((resp) => {
//             if (resp.data) {
//                 dispatch({type: types.USER_DETAILS_LOADED, data: resp.data.User});
//             }
//             if(resp.errors) {
//                  dispatch({ type: types.USER_DETAILS_ERROR, errors: resp.errors});
//             }
//         }).catch( (exception) => {
//             dispatch({ type: types.EXCEPTION, exception: exception});
//         });
//     }
// }