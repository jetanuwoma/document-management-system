import axios from 'axios';
import actionTypes from '../constants';
import { getDocumentCounts } from './documentsAction';


/**
 * loadDocumentsSucess - Dispatches document loading success from the database
 *
 * @param  {array} documents - array to be dispatched
 * @return {object}         - dispatched action type and documents
 */
export function loadDocumentsSucess(documents) {
  return {
    type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS,
    documents,
  };
}
/**
 * loadDocumentsSearchSucess - Dispatches searches results
 *
 * @param  {array} result  - array of documents
 * @return {object}         - dispatched action type and documents
 */
export function loadDocumentsSearchSucess(result) {
  return {
    type: actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS,
    result,
  };
}

/**
 * loadUsersSuccessful - lists of all users
 *
 * @param  {array} users - list of users
 * @return {object}       -   dispatched action type and results
 */
export function loadUsersSuccessful(users) {
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
        dispatch(loadUsersSuccessful(users.data));
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
 * @return {callback}  -  dispatch callback
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
    return Promise.all(actionCall);
  };
}


/**
 * listAllDocuments - get all users documents
 * api/documents
 * @param  {Number} offset = 0 - offset
 * @return {Promise}          - axios promise call
 */
export function listAllDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`api/documents?offset=${offset}`)
      .then((documents) => {
        getDocumentCounts()
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count,
            });
          });
        dispatch(loadDocumentsSucess(documents.data));
      });
  };
}

/**
 * search for users
 * GET /search/users
 * @export searchUsers
 * @param {string} q - Search query
 * @returns {Promise} - axios promise
 */
export function searchUsers(q) {
  return (dispatch) => {
    return axios.get(`/api/search/users?q=${q}`)
      .then((res) => {
        dispatch(loadUsersSuccessful(res.data.result));
      });
  };
}
