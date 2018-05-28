import { combineReducers } from 'redux';
import * as handleException from './handleException';

export default combineReducers(Object.assign(
    handleException,
));