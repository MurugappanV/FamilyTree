import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { familyDetail, userCloseRelation } from '../graphql/quries';

export function getFamilyDetails(id) {
    return (dispatch, getState) => {
        dispatch({type: types.GET_FAMILY_LOADING});
        client.resetStore()
        client.query({
            query: familyDetail,
            variables: {id: id, metaId: null}
        }).then((resp) => {
            if (resp.data) {
                dispatch({type: types.GET_FAMILY_LOADED, data: resp.data.Family});
            }
            if(resp.errors) {
                 dispatch({ type: types.GET_FAMILY_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}

export function getUserCloseRelation(id) {
    return (dispatch, getState) => {
        dispatch({type: types.GET_USER_RELATION_LOADING});
        client.query({
            query: userCloseRelation,
            variables: {id: id}
        }).then((resp) => {
            if (resp.data) {
                dispatch({type: types.GET_USER_RELATION_LOADED, data: resp.data.User});
            }
            if(resp.errors) {
                 dispatch({ type: types.GET_USER_RELATION_ERROR, errors: resp.errors});
            }
        }).catch( (exception) => {
            dispatch({ type: types.EXCEPTION, exception: exception});
        });
    }
}