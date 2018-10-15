import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { authenticateUser, userByIdQuery, isUser } from '../graphql/quries';
import { AsyncStorage } from 'react-native'

export function setPhoneNumber(phoneNumber) {
    return (dispatch, getState) => {
        dispatch({type: types.SET_PHONE_NUMBER, data: phoneNumber});
    }
}

export function checkUser(phoneNumber) {
    return (dispatch, getState) => {
        dispatch({type: types.USER_CHECK_LOADING});
        client.query({
            query: isUser,
            variables: {phoneNumber: phoneNumber}
        }).then((resp) => {
            if (resp.data.User) {
                dispatch({type: types.USER_CHECK_LOADED});
            } else {
                dispatch({ type: types.USER_CHECK_ERROR});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}

export function clearUserCheck() {
    return (dispatch, getState) => {
        dispatch({type: types.CLEAR_USER_CHECK});
    }
}

export function clearTokenId() {
    return (dispatch, getState) => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userId');
        dispatch({type: types.GRAPHCOOL_AUTH_TOKEN_CLEAR});
        dispatch({type: types.CLEAR_USER_ID});
        dispatch({type: types.CLEAR_USER_DETAILS})
    }
}

export function setTokenId(token, phoneNumber) {
    return (dispatch, getState) => {
        client.mutate({
            mutation: authenticateUser,
            variables: {firebaseToken: token, phoneNumber: phoneNumber}
        }).then((resp) => {
            if (resp.data) {
                AsyncStorage.setItem('token', resp.data.authenticateFirebaseUser.token);
                AsyncStorage.setItem('userId', resp.data.authenticateFirebaseUser.id);
                let userId = resp.data.authenticateFirebaseUser.id;
                dispatch({ type: types.SET_USER_ID, data: userId});
                if(userId != null) {
                    getUserById(dispatch, userId)
                }
                dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_OBTAINED});
            } else {
                dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_ERROR});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
} 

export const getUserById = (dispatch, userId) => {
    dispatch({type: types.USER_DETAILS_LOADING});
    client.query({
        query: userByIdQuery,
        variables: {id: userId}
    }).then((resp) => {
        if (resp.data) {
            dispatch({type: types.USER_DETAILS_LOADED, data: resp.data.User});
        }
        if(resp.errors) {
            dispatch({ type: types.USER_DETAILS_ERROR, errors: resp.errors});
        }
    }).catch( (exception) => {
        dispatch({ type: types.EXCEPTION, exception: exception});
    });
}

export const getUserUsingId = (userId) => {
    return (dispatch, getState) => {
        dispatch({type: types.USER_DETAILS_LOADING});
        client.query({
            query: userByIdQuery,
            variables: {id: userId}
        }).then((resp) => {
            if (resp.data) {
                dispatch({type: types.USER_DETAILS_LOADED, data: resp.data.User});
            }
            if(resp.errors) {
                dispatch({ type: types.USER_DETAILS_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}