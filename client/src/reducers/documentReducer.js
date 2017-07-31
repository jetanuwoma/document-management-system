import actionTypes from '../constants';
import initialState from './initialState';


export default function documentReducer(state = initialState.manageDocument, action) {
  switch (action.type) {
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        allDocuments: [action.document, ...state.allDocuments],
      };

    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        allDocuments: [...action.documents],
      };

    case actionTypes.GET_DOCUMENT_SUCCESS:
      return {
        ...state,
        selectedDocument: action.document,
      };

    case actionTypes.DOCUMENT_DELETED_SUCCESSFULLY:
      return {
        ...state,
        allDocuments: state.allDocuments.filter(({ id }) => id !== action.document.id),
        archived: action.document,
      };

    case actionTypes.UNDO_DELETED_ITEM:
      return {
        ...state,
        allDocuments: [...action.documents],
      };

    default:
      return state;
  }
}
