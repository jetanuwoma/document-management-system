/* global describe, expect, it, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../helper/axiosMock';
import * as pageActions from '../../actions/pageAction';
import actionTypes from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Page actions', () => {
  
  it('Should clear search query', () => {
    const store = mockStore();
    store.dispatch(pageActions.clearSearch());
    const expectedAction = store.getActions();
    expect(expectedAction.length).toBe(1);
    expect(expectedAction[0].type).toEqual(actionTypes.CLEAR_SEARCH_QUERY);
  });

  it('Should set search source', () => {
    const store = mockStore();
    store.dispatch(pageActions.triggerSearch('publicDocuments'));
    const expectedAction = store.getActions();
    expect(expectedAction.length).toBe(1);
    expect(expectedAction[0].type).toEqual(actionTypes.CHANGE_SEARCH_LOCATION);
    expect(expectedAction[0].source).toEqual('publicDocuments');
  });

  it('Should change search query', () => {
    const store = mockStore();
    store.dispatch(pageActions.changeSearchQuery('abc'));
    const expectedAction = store.getActions();
    expect(expectedAction.length).toBe(1);
    expect(expectedAction[0].type).toEqual(actionTypes.CHANGE_SEARCH_QUERY);
    expect(expectedAction[0].query).toEqual('abc');
  });
});
