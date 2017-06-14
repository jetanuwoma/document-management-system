import axios from 'axios';
import actionTypes from '../constants';

export function loadDocumentsSucess(documents) {
  return {
    type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS,
    documents
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


export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`api/users/${id}`);
  };
}

export function listAllDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`api/documents?offset=${offset}`)
      .then((documents) => {
        console.log(documents, 'loaded data');
        dispatch(loadDocumentsSucess(documents.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
