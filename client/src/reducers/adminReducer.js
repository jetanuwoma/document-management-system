import actionTypes from '../constants';
import initialState from './initialState';

export default function adminReducer(state = initialState.adminManagement, action) {
  switch (action.type) {
  case actionTypes.LOAD_USERS_SUCCESSFUL:
    return {
      ...state,
      users: [...action.users]
    };

  case actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS:
    return {
      ...state,
      allUsersDocuments: [...action.documents]
    };

  case actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS:
    return {
      ...state,
      allUsersDocuments: [...action.result.rows]
    };

  case actionTypes.SELECT_USER:
    return {
      ...state,
      selectedUsers: [...state.selectedUsers, action.id]
    };

  case actionTypes.REMOVE_SELECTED_USER:
    return {
      ...state,
      selectedUsers: [...action.users]
    };

  default:
    return state;
  }
}
