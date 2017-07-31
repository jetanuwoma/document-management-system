import axios from 'axios';
import jwtDecode from 'jwt-decode';
import toastr from 'toastr';
import actionTypes from '../constants';

/**
 * loginError - login user error
 * @param {String}  error -report
 * @returns {Object} - action type and error message
 */
export function loginError(error) {
  return {
    type: actionTypes.LOGIN_USER_ERROR,
    error,
  };
}

/**
 * setLoggedInUser
 *
 * @export
 * @param {Object} user selected user data
 * @returns {Object} data
 */
export function setLoggedInUser(user) {
  return {
    type: actionTypes.LOGIN_USER,
    user,
  };
}


/**
 * Creates a new user details
 * @export registerUser
 * @param {Object} user - user record to be created
 * @returns {Promise}  -  axios response
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
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}

/**
 * login logs in a user
 * @export saveUser
 * @param {Object} user - user record for authorization
 * @returns {Promise} - axios promise call
 */
export function login(user) {
  return (dispatch) => {
    return axios.post('/api/users/login', user)
      .then((result) => {
        localStorage.setItem('tokenize', result.data.token);
        axios.defaults.headers = { 'x-access-token': result.data.token };
        dispatch(setLoggedInUser(jwtDecode(result.data.token)));
      })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}

/**
 * confirmOldPassword checks if old password is correct
 * @param {String} email
 * @param {String} password
 */
export function confirmOldPassword(email, password) {
  return (dispatch) => {
    return axios.post('/api/users/login', { email, password })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}

/**
 *
 * log user out and delete details from localStorage
 * @export
 * @returns {Function}
 */
export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('tokenize');
    axios.default.headers = {};
    dispatch(setLoggedInUser({}));
  };
}

/**
 * updateProfile updates a user profile
 * PUT /users/:id
 * @export updateProfile
 * @param {Object} user
 * @returns {Promise} - axios promise
 */
export function updateProfile(user) {
  return (dispatch) => {
    return axios.put(`/api/users/${user.userId}`, user)
      .then((res) => {
        dispatch({
          type: actionTypes.USER_RECORD_UPDATED,
          user: { ...user, ...res.data.data },
        });
      })
      .catch((err) => {
        dispatch(loginError({ message: 'error occurred please try again' }));
      });
  };
}

