import actionTypes from '../constants';
import initialState from './initialState';


export default function documentReducer(state = initialState.manageDocument, action) {
  switch (action.type) {
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        alldocuments: [action.document, ...state.alldocuments],
      };

    case actionTypes.LOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        alldocuments: [...action.documents],
      };

    case actionTypes.LOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        selectedDocument: action.document,
      };

    case actionTypes.DOCUMENT_DELETED_SUCCESSFULLY:
      return {
        ...state,
        alldocuments: state.alldocuments.filter(({ id }) => id !== action.document.id),
        archived: action.document,
      };

    case actionTypes.UNDO_DELETED_ITEM:
      return {
        ...state,
        alldocuments: [...action.documents],
      };

    default:
      return state;
  }
}
