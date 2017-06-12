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

 export function loadUserDocuments() {
   return (dispatch, getState) => {
     return axios.get(`/api/users/${getState().user.user.UserId}/documents`)
       .then((res) => {
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
