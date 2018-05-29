import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { authenticateUser } from '../graphql/quries';
import { AsyncStorage } from 'react-native'

export function setPhoneNumber(phoneNumber) {
    return (dispatch, getState) => {
        dispatch({type: types.SET_PHONE_NUMBER, data: phoneNumber});
    }
}

export function clearTokenId() {
    return (dispatch, getState) => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userId');
        dispatch({type: types.GRAPHCOOL_AUTH_TOKEN_CLEAR});
        dispatch({type: types.CLEAR_USER_ID});
        dispatch({type: types.CLEAR_USER_DETAILS})
        dispatch({type: types.CLEAR_PRESCRIPTION_LIST})
    }
}

export function setTokenId(token) {
    return (dispatch, getState) => {
        client.mutate({
            mutation: authenticateUser,
            variables: {firebaseToken: token}
        }).then((resp) => {
            if (resp.data) {
                AsyncStorage.setItem('token', resp.data.authenticateFirebaseUser.token);
                AsyncStorage.setItem('userId', resp.data.authenticateFirebaseUser.id);
                dispatch({ type: types.SET_USER_ID, data: resp.data.authenticateFirebaseUser.id});
                dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_OBTAINED});
            } else {
                dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_ERROR});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
} 

