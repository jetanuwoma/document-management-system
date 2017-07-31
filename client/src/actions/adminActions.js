import axios from 'axios';
import toastr from 'toastr';
import actionTypes from '../constants';


/**
 * getDocumentsSucess - Dispatches document loading success from the database
 *
 * @param  {array} documents - array to be dispatched
 * @return {Object}         - dispatched action type and documents
 */
export function getDocumentsSucess(documents) {
  return {
    type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS,
    documents,
  };
}


/**
 * searchSuccess - Dispatches searches results
 *
 * @param  {array} result  - array of documents
 * @return {Object}         - dispatched action type and documents
 */
export function searchSuccess(result) {
  return {
    type: actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS,
    result,
  };
}

/**
 * getUsersSuccess - lists of all users
 *
 * @param  {array} users - list of users
 * @return {Object}       -   dispatched action type and results
 */
export function getUsersSuccess(users) {
  return {
    type: actionTypes.LOAD_USERS_SUCCESSFUL,
    users,
  };
}

/**
 * listAllUsers - get all users from the database
 * /api/users
 * @return {Promise}  - axios Promise
 */
export function listAllUsers() {
  return (dispatch) => {
    return axios.get('api/users')
      .then((users) => {
        dispatch(getUsersSuccess(users.data));
      })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}

/**
 * removeSelectedUser - Remove a user from list of users to be deleted
 * @param {Number} id - User id
 * @param {Number} index - User position
 * @return {Promise}   - axios Promise
 */
export function removeSelectedUser(id, index) {
  return (dispatch, getState) => {
    const selectedUsers = getState().adminManagement.selectedUsers.slice();
    selectedUsers.splice(index, 1);
    dispatch({
      type: actionTypes.REMOVE_SELECTED_USER,
      users: selectedUsers,
    });
  };
}


/**
 * selectUser - Add a user to list of selected users
 *
 * @param  {Number} id - user id
 * @return {Function}  -  dispatch callback
 */
export function selectUser(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_USER,
      id,
    });
  };
}


/**
 * deleteUsers - deletes all selected user(s)
 * @param  {array} allUsers - list of all selected users to be deleted
 * @return {Promise}        - Promise call
 */
export function deleteUsers(allUsers) {
  return (dispatch) => {
    const actionCall = allUsers.map((id) => {
      return axios.delete(`api/users/${id}`);
    });
    dispatch({
      type: actionTypes.REMOVE_SELECTED_USER,
      users: [],
    });
    return Promise.all(actionCall)
      .catch(() => toastr.error('Could not delete user(s)'));
  };
}


/**
 * getAllDocuments - get all users documents
 * api/documents
 * @param  {Number} offset = 0 - offset
 * @return {Promise}          - axios promise call
 */
export function getAllDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`api/documents?offset=${offset}`)
      .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count,
            });
        dispatch(getDocumentsSucess(response.data.rows));
      })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}

/**
 * search for users
 * GET /search/users
 * @export searchUsers
 * @param {String} terms - Search query
 * @returns {Promise} - axios promise
 */
export function searchUsers(terms) {
  return (dispatch) => {
    return axios.get(`/api/search/users?q=${terms}`)
      .then((res) => {
        dispatch(getUsersSuccess(res.data.result));
      })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  };
}
