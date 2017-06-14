import actionTypes from '../constants';

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

export function triggerSearch(query) {
  return (dispatch) => {
    dispatch(changeSearchQuery(query));
  };
}
