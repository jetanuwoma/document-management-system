import actionTypes from '../constants';
import initialState from './initialState';

export default function pageControlReducer(state = initialState.pageControls, action) {
  switch (action.type) {
  case actionTypes.CHANGE_SEARCH_LOCATION:
    return {
      ...state,
      searchSource: action.source,
    };

  case actionTypes.CHANGE_SEARCH_QUERY:
    return {
      ...state,
      isSearching: action.query.length >= 1,
      searchQuery: action.query,
    };

  case actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS:
    return {
      ...state,
      searchCount: action.result.count
    };

  case actionTypes.SET_DOCUMENT_COUNT:
    return {
      ...state,
      totalDocument: action.count
    };
  default:
    return state;
  }
}
