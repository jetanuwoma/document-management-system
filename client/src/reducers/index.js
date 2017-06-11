import { combineReducers } from 'redux';
import user from './userReducer';
import manageDocument from './documentReducer';

const rootReducer = combineReducers({
  user,
  manageDocument,
});

export default rootReducer;
