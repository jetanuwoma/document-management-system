import axios from 'axios';
import actionTypes from '../constants';


/**
 * createDocumentSuccess - dispatch Successful document creation
 *
 * @param  {Object} document - document created
 * @return {Object}          dispatched action type and document
 */
export function createDocumentSuccess(document) {
  return {
    type: actionTypes.CREATE_DOCUMENT_SUCCESS,
    document,
  };
}


/**
 * loadDocumentsSuccess - Dispatches documents retriving success
 *
 * @param  {array} documents - documents retrieved
 * @return {Object}          - action type and documents retrieved
 */
export function loadDocumentsSuccess(documents) {
  return {
    type: actionTypes.LOAD_DOCUMENTS_SUCCESS,
    documents,
  };
}


/**
 * loadDocumentSuccess - Single document loaded Successfully
 *
 * @param  {Object} document - single document retrieved from the database
 * @return {Object}          - action type and document retrieved
 */
export function loadDocumentSuccess(document) {
  return {
    type: actionTypes.LOAD_DOCUMENT_SUCCESS,
    document,
  };
}


/**
 * documentDeletedSuccessfully - Tells if document have been deleted
 *
 * @param  {Object} document document deleted from the database
 * @return {Object}          action type and single document deleted
 */
export function documentDeletedSuccessfully(document) {
  return {
    type: actionTypes.DOCUMENT_DELETED_SUCCESSFULLY,
    document,
  };
}

/**
* save a new document to database
* api/documents
* @param {Object} document - document to be created
* @returns {Promise} - axios promise call
*/
export function saveDocument(document) {
  return (dispatch) => {
    return axios.post('/api/documents', document).then((result) => {
      dispatch(createDocumentSuccess(result.data));
    });
  };
}


/**
 * getDocumentCounts - gets total number of a user document
 *
 * @param  {string} access = null - access scope to search
 * @return {Promise}              - axios promise call
 */
export function getDocumentCounts(access = null) {
  if (access === null) {
    return axios.get('/api/count/document');
  }
  return axios.get(`/api/count/document?access=${access}`);
}


/**
* loadUserDocuments - Get users documents from the api call
* /api/users/:id/documents
* @param  {Number} offset = 0 - offset for pagination
* @return {Promise}            axios promise call
*/
export function loadUserDocuments(offset = 0) {
  return (dispatch, getState) => {
    return axios.get(`/api/users/${getState().auth.user.UserId}/documents?offset=${offset}`) //eslint-disable-line
      .then((res) => {
        getDocumentCounts()
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count,
            });
          });
        dispatch(loadDocumentsSuccess(res.data));
      });
  };
}


/**
 * deleteDocument - Deletes a document
 *
 * @param  {Object} document - document to be deleted
 * @return {Promise}         - axios promise
 */
export function deleteDocument(document) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${document.id}`)
      .then(() => {
        dispatch(documentDeletedSuccessfully(document));
      });
  };
}


/**
 * undoDelete - restores deleted document
 *
 * @return {callback}  dispatched undoDelete event
 */
export function undoDelete(document) {
  return (dispatch) => {
    dispatch(saveDocument(document));
  };
}


/**
* loadDocument - get single document
*
* @param  {Number} id - document id to be retrieved
* @return {Promise}   - axios promise call
*/
export function loadDocument(id) {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then((result) => {
        dispatch(loadDocumentSuccess(result.data));
      });
  };
}


/**
 * updateDocument - Updates a document
 *
 * @param  {Object} document - document to be changed
 * @return {Promise}          - axios promise call
 */
export function updateDocument(document) {
  return (dispatch) => {
    return axios.put(`/api/documents/${document.id}`, document);
  };
}


/**
* loadPublicDocuments - Retrieves all public documents
*
* @param  {Number} offset = 0 - offset pagination
* @return {Promise}           - axios call
*/
export function loadPublicDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`/api/documents/access/public?offset=${offset}`)
      .then((res) => {
        getDocumentCounts('public')
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count,
            });
          });
        dispatch(loadDocumentsSuccess(res.data));
      });
  };
}

/**
 * searchDocuments - Search for document
 * api/search/document?q
 * @param  {String} query     -  search term
 * @param  {String} source = '' - search scope either users or document
 * @param  {Number} offset = 0  - offset for Pagination
 * @return {Promise}            - axios promise
 */
export function searchDocuments(query, source = '') {
  return (dispatch) => {
    return axios.get(`/api/search/document?q=${query}&access=${source}`)
      .then((result) => {
        dispatch(loadDocumentsSuccess(result.data.rows));
        dispatch({
          type: actionTypes.CHANGE_SEARCH_QUERY,
          query,
        });
      });
  };
}
