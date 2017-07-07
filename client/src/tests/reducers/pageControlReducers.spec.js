/*global expect, describe, it */
import pageControlReducers from '../../reducers/pageControlReducer';
import actionTypes from '../../constants';
import initialState from '../../reducers/initialState';

describe('Page Reducers', () => {
  it('Should load all user documents successfully', () => {
    const expected = {
      searchSource: 'publicDocuments',
      isSearching: false,
      searchQuery: '',
      searchCount: 0,
      totalDocument: 0,
    };
    expect(pageControlReducers(initialState.pageControls, {
      type: actionTypes.CHANGE_SEARCH_LOCATION,
      source: 'publicDocuments' })).toEqual(expected);
  });

  it('Should store current search query', () => {
    const expected = {
      searchSource: 'document',
      isSearching: true,
      searchQuery: 'abc',
      searchCount: 0,
      totalDocument: 0,
    };
    expect(pageControlReducers(initialState.pageControls, {
      type: actionTypes.CHANGE_SEARCH_QUERY,
      query: 'abc' })).toEqual(expected);
  });

  it('Should store search documents result count', () => {
    const expected = {
      searchSource: 'document',
      isSearching: false,
      searchQuery: '',
      searchCount: 3,
      totalDocument: 0,
    };
    expect(pageControlReducers(initialState.pageControls, {
      type: actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS,
      result: { count: 3 } })).toEqual(expected);
  });

  it('Should store all documents result count', () => {
    const expected = {
      searchSource: 'document',
      isSearching: false,
      searchQuery: '',
      searchCount: 0,
      totalDocument: 3,
    };
    expect(pageControlReducers(initialState.pageControls, {
      type: actionTypes.SET_DOCUMENT_COUNT,
      count: 3 })).toEqual(expected);
  });

  it('Should clear search query', () => {
    const expected = {
      searchSource: 'document',
      isSearching: false,
      searchQuery: '',
      searchCount: 0,
      totalDocument: 0,
    };

    const modified = pageControlReducers(initialState.pageControls, {
      type: actionTypes.CHANGE_SEARCH_QUERY,
      query: 'abc' });

    expect(pageControlReducers(modified, {
      type: actionTypes.CLEAR_SEARCH_QUERY })).toEqual(expected);
  });
});
