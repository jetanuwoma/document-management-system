import actionTypes from '../constants';

/**
 * changeSearchSource - set search scope
 *
 * @param  {String} source - search scope
 * @return {Function}        dispatch callback
*/
export function changeSearchSource(source) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SEARCH_LOCATION,
      source,
    });
  };
}


/**
 * changeSearchQuery - dispatched search query
 *
 * @param  {String} query - search term
 * @return {Function}       dispatch function
 */
export function changeSearchQuery(query) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SEARCH_QUERY,
      query,
    });
  };
}


/**
 * triggerSearch - dispatches search source
 *
 * @param  {type} source - search scope, where to search from
 * @return {Function}        dispatch callback
*/
export function triggerSearch(source) {
  return (dispatch) => {
    dispatch(changeSearchSource(source));
  };
}

/**
 * clearSearch - clear search query
 *
 * @return {Function} - dispatch callback
 */
export function clearSearch() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SEARCH_QUERY,
    });
  };
}
