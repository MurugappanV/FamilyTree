import { combineReducers } from 'redux';
import * as handleException from './handleException';
import * as loginReducer from '../../../login/reducer/LoginReducer';
import * as userDetReducer from '../../../userDetail/reducer/userDetReducer';
import * as familyReducer from '../../../families/reducer/familyReducer';
import * as addFamilyReducer from '../../../addFamily/reducers/addFamilyReducer';

export default combineReducers(Object.assign(
    handleException,
    loginReducer,
    userDetReducer,
    familyReducer,
    addFamilyReducer
));