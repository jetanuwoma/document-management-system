/*global expect, describe, it */
import adminReducers from '../../reducers/adminReducer';
import actionTypes from '../../constants';
import initialState from '../../reducers/initialState';

describe('Admin Reducers', () => {
  it('Should load all users successfully', () => {
    const expected = { users: [{}, {}, {}],
      allUsersDocuments: [],
      selectedUsers: [] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.LOAD_USERS_SUCCESSFUL,
      users: [{}, {}, {}] })).toEqual(expected);
  });

  it('Should load all documents successfully', () => {
    const expected = { allUsersDocuments: [{}, {}, {}],
      users: [],
      selectedUsers: [] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS,
      documents: [{}, {}, {}] })).toEqual(expected);
  });

  it('Should load all admin documents successfully', () => {
    const expected = { allUsersDocuments: [{}, {}, {}],
      users: [],
      selectedUsers: [] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.LOAD_DOCUMENTS_SUCCESS,
      documents: [{}, {}, {}] })).toEqual(expected);
  });

  it('Should select a user', () => {
    const expected = { allUsersDocuments: [],
      users: [],
      selectedUsers: [1] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.SELECT_USER,
      id: 1,
    })).toEqual(expected);
  });

  it('Should load documents search results', () => {
    const expected = { allUsersDocuments: [{}, {}, {}],
      users: [],
      selectedUsers: [] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.LOAD_DOCUMENT_SEARCH_SUCCESS,
      result: { rows: [{}, {}, {}] },
    })).toEqual(expected);
  });

  it('Should remove deleted document', () => {
    const expected = { allUsersDocuments: [{ id: 2 }, { id: 3 }],
      users: [],
      selectedUsers: [] };
    const modified = adminReducers(initialState.adminManagement, {
      type: actionTypes.LOAD_DOCUMENTS_SUCCESS,
      documents: [{ id: 1 }, { id: 2 }, { id: 3 }] });
    expect(adminReducers(modified, {
      type: actionTypes.DOCUMENT_DELETED_SUCCESSFULLY,
      document: { id: 1 },
    })).toEqual(expected);
  });

  it('Should remove a user from delete list', () => {
    const expected = { allUsersDocuments: [],
      users: [],
      selectedUsers: [1] };
    expect(adminReducers(initialState.adminManagement, {
      type: actionTypes.REMOVE_SELECTED_USER,
      users: [1],
    })).toEqual(expected);
  });
});
