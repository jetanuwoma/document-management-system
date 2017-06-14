import { combineReducers } from 'redux';
import user from './userReducer';
import manageDocument from './documentReducer';
import adminManagement from './adminReducer';
import pageControls from './pageControlReducer';

const rootReducer = combineReducers({
  user,
  manageDocument,
  adminManagement,
  pageControls,
});

export default rootReducer;
