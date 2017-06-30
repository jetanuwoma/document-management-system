import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './userReducer';
import manageDocument from './documentReducer';
import adminManagement from './adminReducer';
import pageControls from './pageControlReducer';

const rootReducer = combineReducers({
  auth,
  manageDocument,
  adminManagement,
  pageControls,
  routing: routerReducer,
});

export default rootReducer;
