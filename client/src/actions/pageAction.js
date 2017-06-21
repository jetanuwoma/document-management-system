import actionTypes from '../constants';
import { searchDocuments } from './adminActions';

export function changeSearchSource(source) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SEARCH_LOCATION,
      source
    });
  };
}

export function changeSearchQuery(query) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SEARCH_QUERY,
      query
    });
  };
}

export function triggerSearch(query, source) {
  return (dispatch) => {
    dispatch(changeSearchQuery(query));
    dispatch(searchDocuments(query));
  };
}
