import * as types from '../../common/redux/types';
import client from '../../common/redux/apollo/client';
import { familyDetail } from '../graphql/quries';

export function getFamilyDetails(id) {
    return (dispatch, getState) => {
        dispatch({type: types.GET_FAMILY_LOADING});
        client.query({
            query: familyDetail,
            variables: {id: id}
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