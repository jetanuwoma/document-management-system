import isEmpty from 'lodash/isEmpty';
import actionTypes from '../constants';
import initialState from './initialState';

export default function userReducer(state = initialState.auth, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
        error: {},
      };

    case actionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.USER_RECORD_UPDATED:
      return {
        ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
        error: {},
      };

    default:
      return state;
  }
}
