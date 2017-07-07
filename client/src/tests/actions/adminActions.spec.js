/* global describe, expect, it, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../helper/axiosMock';
import * as adminActions from '../../actions/adminActions';
import actionTypes from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Admin actions', () => {
  it('Should search for users', () => {
    const store = mockStore();
    return store.dispatch(adminActions.searchUsers())
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(1);
        expect(expectedAction[0].type).toEqual(actionTypes.LOAD_USERS_SUCCESSFUL);
      });
  });

  it('Should retrieve all documents', () => {
    const store = mockStore();
    return store.dispatch(adminActions.listAllDocuments())
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(2);
        expect(expectedAction[0].type).toEqual(actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS);
        expect(expectedAction[1].type).toEqual(actionTypes.SET_DOCUMENT_COUNT);
      });
  });

  it('Should retrieve all users', () => {
    const store = mockStore();
    return store.dispatch(adminActions.listAllUsers())
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(1);
        expect(expectedAction[0].type).toEqual(actionTypes.LOAD_USERS_SUCCESSFUL);
      });
  });

  it('Should dispatch user selected', () => {
    const store = mockStore();
    store.dispatch(adminActions.selectUser(1));
    const expectedAction = store.getActions();
    expect(expectedAction.length).toBe(1);
    expect(expectedAction[0].type).toEqual(actionTypes.SELECT_USER);
  });

  it('Should remove selected users', () => {
    const store = mockStore({ adminManagement: { selectedUsers: [1, 2, 3, 4] } });
    store.dispatch(adminActions.removeSelectedUser(1, 0));
    const expectedAction = store.getActions();
    expect(expectedAction.length).toBe(1);
    expect(expectedAction[0].type).toEqual(actionTypes.REMOVE_SELECTED_USER);
    expect(expectedAction[0].users.length).toBe(3);
  });

  it('Should dispatch deleted users', () => {
    const store = mockStore();
    return store.dispatch(adminActions.deleteUsers([1]))
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(1);
        expect(expectedAction[0].type).toEqual(actionTypes.REMOVE_SELECTED_USER);
      });
  });
});
