import axios from 'axios';
import toastr from 'toastr';
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
 * getDocumentsSuccess - Dispatches documents retriving success
 *
 * @param  {array} documents - documents retrieved
 * @return {Object}          - action type and documents retrieved
 */
export function getDocumentsSuccess(documents) {
  return {
    type: actionTypes.GET_DOCUMENTS_SUCCESS,
    documents,
  };
}


/**
 * getDocumentSuccess - Single document loaded Successfully
 *
 * @param  {Object} document - single document retrieved from the database
 * @return {Object}          - action type and document retrieved
 */
export function getDocumentSuccess(document) {
  return {
    type: actionTypes.GET_DOCUMENT_SUCCESS,
    document,
  };
}


/**
 * deleteDocSuccess - Tells if document have been deleted
 *
 * @param  {Object} document document deleted from the database
 * @return {Object}          action type and single document deleted
 */
export function deleteDocSuccess(document) {
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
    })
      .catch((error) => {
        toastr.error('Could not save documents')
      });
  };
}


/**
* getUserDocuments - Get users documents from the api call
* /api/users/:id/documents
* @param  {Number} offset = 0 - offset for pagination
* @return {Promise}            axios promise call
*/
export function getUserDocuments(userId, offset = 0) {
  return (dispatch, getState) => {
    return axios.get(`/api/users/${userId}/documents?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_DOCUMENT_COUNT,
          count: res.data.count,
        });
        dispatch(getDocumentsSuccess(res.data.rows));
      })
      .catch((error) => {
        toastr.error('Error fetching documents')
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
        dispatch(deleteDocSuccess(document));
      })
      .catch((error) => {
        toastr.error('Unable to delete document')
      });
  };
}


/**
 * undoDelete - restores deleted document
 *
 * @return {Function}  dispatched undoDelete event
 */
export function undoDelete(document) {
  return (dispatch) => {
    return dispatch(saveDocument(document));
  };
}


/**
* getDocument - get single document
*
* @param  {Number} id - document id to be retrieved
* @return {Promise}   - axios promise call
*/
export function getDocument(id) {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then((result) => {
        dispatch(getDocumentSuccess(result.data));
      })
      .catch(() => {
        toastr.error('Unable to get document')
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
    return axios.put(`/api/documents/${document.id}`, document)
      .then(() => {
        dispatch({
          type: actionTypes.DOCUMENT_UPDATE_SUCCESS,
        });
      })
      .catch(() => {
        toastr.error('Document could not be updated')
      });
  };
}


/**
* getPublicDocuments - Retrieves all public documents
*
* @param  {Number} offset = 0 - offset pagination
* @return {Promise}           - axios call
*/
export function getPublicDocuments(offset = 0) {
  return (dispatch) => {
    return axios.get(`/api/documents/access/public?offset=${offset}`)
      .then((res) => {
        dispatch(getDocumentsSuccess(res.data.rows));
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: res.data.count,
            });
      })
      .catch((error) => {
        toastr.error('Error occurred while getting documents');
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
export function searchDocuments(query, source = '', offset = 0) {
  return (dispatch) => {
    return axios.get(`/api/search/document?q=${query}&access=${source}&offset=${offset}`)
      .then((response) => {

            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count,
            });
            dispatch(getDocumentsSuccess(response.data.rows));
            dispatch({
              type: actionTypes.CHANGE_SEARCH_QUERY,
              query,
            });
          })
      .catch(() => {
        toastr.error('Error occurred while searching for documents')
      });
  };
}
