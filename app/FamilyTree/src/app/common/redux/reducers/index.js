import { combineReducers } from 'redux';
import * as handleException from './handleException';
import * as loginReducer from '../../../login/reducer/LoginReducer';
import * as userDetReducer from '../../../userDetail/reducer/userDetReducer';
import * as familyReducer from '../../../families/reducer/familyReducer';
import * as addFamilyReducer from '../../../addFamily/reducers/addFamilyReducer';
import * as familyDetReducer from '../../../family/reducer/familyReducer';
import * as addMemberReducer from '../../../addMember/reducer/addMemberReducer';
import * as startUpReducer from '../../../navigator/reducer/StartUpReducer';

export default combineReducers(Object.assign(
    handleException,
    loginReducer,
    userDetReducer,
    familyReducer,
    addFamilyReducer,
    familyDetReducer,
    addMemberReducer,
    startUpReducer
));