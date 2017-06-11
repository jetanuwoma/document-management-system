import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../constants';

/**
 * loginError login user error
 * @returns {Object} object
 */
export function loginError(error) {
  return {
    type: actionTypes.LOGIN_USER_ERROR,
    error
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
 * isUserExisting - check if a user has been existing
 * @export
 * @param {any} identifier
 * @returns {objeect} uuser
 */
export function isUserExisting(identifier) {
  return () => {
    return axios.get(`/api/users/${identifier}`);
  };
}

/**
 * Creates a new user details
 * @export registerUser
 * @param {object} user
 * @returns {Object} api response
 */
export function registerUser(user) {
  return (dispatch) => {
    return axios.post('/api/users', user)
    .then((result) => {
      const token = result.data.token;
      localStorage.setItem('tokenize', token);
      axios.defaults.headers = { 'x-access-token': result.data.token };
      dispatch(setLoggedInUser(jwtDecode(token)));
    })
    .catch((err) => {
      dispatch(loginError(err));
    });
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
      })
      .catch((err) => {
        dispatch(loginError({ message: 'Invalid credentials supplied' }));
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
