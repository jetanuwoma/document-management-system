import axios from 'axios';
import actionTypes from '../constants';
import { getDocumentCounts } from './documentsAction';

export function loadDocumentsSucess(documents) {
  return {
    type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS,
    documents
  };
}

export function loadDocumentsSearchSucess(result) {
  return {
    type: actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS,
    result
  };
}

export function loadUsersSuccessful(users) {
  return {
    type: actionTypes.LOAD_USERS_SUCCESSFUL,
    users
  };
}

export function listAllUsers() {
  return (dispatch) => {
    return axios.get('api/users')
      .then((users) => {
        dispatch(loadUsersSuccessful(users.data));
      });
  };
}

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
export function selectUser(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_USER,
      id
    });
  };
}

export function deleteUsers(allUsers) {
  return (dispatch) => {
    const actionCall = allUsers.map((id) => {
      return axios.delete(`api/users/${id}`);
    });
    dispatch({
      type: actionTypes.REMOVE_SELECTED_USER,
      users: []
    });
    return Promise.all(actionCall);
  };
}

export function listAllDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`api/documents?offset=${offset}`)
      .then((documents) => {
        getDocumentCounts()
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count
            });
          });
        dispatch(loadDocumentsSucess(documents.data));
      });
  };
}

export function searchDocuments(query) {
  return (dispatch) => {
    return axios.get(`api/search/document?q=${query}`)
      .then((documents) => {
        dispatch(loadDocumentsSearchSucess(documents.data));
        dispatch({
          type: actionTypes.LOAD_DOCUMENTS_SUCCESS,
          documents: documents.data.rows,
        });
      });
  };
}
