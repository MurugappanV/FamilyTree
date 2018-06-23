import * as types from '../../common/redux/types';
import { AsyncStorage } from 'react-native'
import { getUserById } from '../../login/actions/loginActions';

export function setUserIdStartUp() {
    return (dispatch, getState) => {
        
        AsyncStorage.getItem('userId').then(userId => {
            console.log("in us id - ", userId)
            dispatch({ type: types.SET_USER_ID, data: userId});
            if(userId != null) {
                getUserById(dispatch, userId)
            }
        })
        AsyncStorage.getItem('token').then(token => {
            console.log("token - ", token)
            token && token.length > 0 && dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_OBTAINED});
        })
    }
}

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
    }
}