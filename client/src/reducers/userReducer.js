import isEmpty from 'lodash/isEmpty';
import actionTypes from '../constants';
import initialState from './initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.LOGIN_USER:
    return {
      user: action.user,
      isAuthenticated: !isEmpty(action.user)
    };

  default:
    return state;
  }
}
