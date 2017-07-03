import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import auth from './userReducer';
import manageDocument from './documentReducer';
import adminManagement from './adminReducer';
import pageControls from './pageControlReducer';

const rootReducer = combineReducers({
  auth,
  notifications,
  manageDocument,
  adminManagement,
  pageControls,
  routing: routerReducer,
});

export default rootReducer;
