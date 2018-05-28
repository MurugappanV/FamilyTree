import * as types from '../../common/redux/types';
import { AsyncStorage } from 'react-native'

export function setUserIdStartUp() {
    return (dispatch, getState) => {
        AsyncStorage.getItem('userId').then(userId => {
            dispatch({ type: types.SET_USER_ID, data: userId});
        })
        AsyncStorage.getItem('token').then(token => {
            token && token.length > 0 && dispatch({ type: types.GRAPHCOOL_AUTH_TOKEN_OBTAINED});
        })
    }
}