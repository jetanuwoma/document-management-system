import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../constants';

/**
 * loginError login user error
 * @returns {Object} object
 */
export function loginError() {
  return {
    type: actionTypes.LOGIN_USER_ERROR
  };
}

/**
 * setLoggedInUser
 *
 * @export
 * @param {any} user selected user data
 * @returns {any} data
 */
export function setLoggedInUser(user) {
  return {
    type: actionTypes.LOGIN_USER,
    user
  };
}

/**
 * loginUser login a user
 * POST /users/login
 * @export saveUser
 * @param {object} user
 * @returns {Object} api response
 */
export function loginUser(user) {
  return (dispatch) => {
    return axios.post('/api/users/login', user)
      .then((result) => {
        localStorage.setItem('tokenize', result.data.token);
        axios.defaults.headers = { 'x-access-token': result.data.token };
        dispatch(setLoggedInUser(jwtDecode(result.data.token)));
      });
  };
}

/**
 *
 * log user out and delete details from localStorage
 * @export
 * @returns {any}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('tokenize');
    axios.default.headers = {};
    dispatch(setLoggedInUser({}));
  };
}
