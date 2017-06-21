import axios from 'axios';
import actionTypes from '../constants';

export function createDocumentSuccess(document) {
  return {
    type: actionTypes.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

export function loadDocumentsSuccess(documents) {
  return {
    type: actionTypes.LOAD_DOCUMENTS_SUCCESS,
    documents
  };
}

export function loadDocumentSuccess(document) {
  return {
    type: actionTypes.LOAD_DOCUMENT_SUCCESS,
    document
  };
}

export function documentDeletedSuccessfully(document) {
  return {
    type: actionTypes.DOCUMENT_DELETED_SUCCESSFULLY,
    document
  };
}

/* save new documents to database
*
* @export
* @param {any} document
* @returns {object} documents
*/
export function saveDocument(document) {
 return (dispatch) => {
   return axios.post('/api/documents', document).then((result) => {
     dispatch(createDocumentSuccess(result.data));
   });
 };
}

export function getDocumentCounts(access = null) {
  if (access === null) {
    return axios.get('/api/count/document');
  }
  return axios.get(`/api/count/document?access=${access}`);
}


 export function loadUserDocuments(offset = 0) {
   return (dispatch, getState) => {
     return axios.get(`/api/users/${getState().user.user.UserId}/documents?offset=${offset}`) //eslint-disable-line
       .then((res) => {
         getDocumentCounts()
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count
            });
          });
         dispatch(loadDocumentsSuccess(res.data));
       });
   };
 }


 export function deleteDocument(document) {
   return (dispatch) => {
     return axios.delete(`/api/documents/${document.id}`)
       .then(() => {
         dispatch(documentDeletedSuccessfully(document));
       });
   };
 }

 export function undoDelete() {
   return (dispatch, getState) => {
     dispatch(saveDocument(getState().manageDocument.archived));
   };
 }

 export function loadDocument(id) {
   return (dispatch) => {
     return axios.get(`/api/documents/${id}`)
       .then((result) => {
         dispatch(loadDocumentSuccess(result.data));
       });
   };
 }

 export function updateDocument(document) {
   return axios.put(`/api/documents/${document.id}`, document);
 }

 export function loadPublicDocuments() {
   return (dispatch) => {
     return axios.get('/api/documents/access/public')
       .then((res) => {
         getDocumentCounts('public')
          .then((response) => {
            dispatch({
              type: actionTypes.SET_DOCUMENT_COUNT,
              count: response.data.count
            });
          });
         dispatch(loadDocumentsSuccess(res.data));
       });
   };
 }
