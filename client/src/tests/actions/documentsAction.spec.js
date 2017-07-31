/* global describe, expect, it */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../helper/axiosMock';
import * as documentsAction from '../../actions/documentsAction';
import actionTypes from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Document Action', () => {

  it('Should return searched result', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.searchDocuments('searchQuery'))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(3);
        expect(expectedActions[0].type).toEqual(actionTypes.SET_DOCUMENT_COUNT);;
      });
  });

    it('Should return public documents', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.getPublicDocuments())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions[0].type).toEqual(actionTypes.GET_DOCUMENTS_SUCCESS);
        expect(expectedActions[1].type).toEqual(actionTypes.SET_DOCUMENT_COUNT);
        expect(expectedActions[0].documents.length).toBe(2);
      });
  });

  it('Should load a single document', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.getDocument(1))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions[0].type).toEqual(actionTypes.GET_DOCUMENT_SUCCESS);
      });
  });

  it('Should load all users documents', () => {
    const store = mockStore({ auth: { user: { userId: 1 } } });
    return store.dispatch(documentsAction.getUserDocuments())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions[0].type).toEqual(actionTypes.GET_DOCUMENTS_SUCCESS);
        expect(expectedActions[1].type).toEqual(actionTypes.SET_DOCUMENT_COUNT);
        expect(expectedActions[0].documents.length).toBe(2);
      });
  });

  it('Should recreate document for an undo delete action', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.undoDelete({ id: 1, title: 'some' }))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions[0].type).toEqual(actionTypes.CREATE_DOCUMENT_SUCCESS);
        expect(expectedActions[0].document.title).toBe('The book of mistery');
      });
  });

  it('Should delete document', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.deleteDocument({ id: 1, title: 'some' }))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions[0].type).toEqual(actionTypes.DOCUMENT_DELETED_SUCCESSFULLY);
      });
  });

  it('Should update document', () => {
    const store = mockStore();
    return store.dispatch(documentsAction.updateDocument({ id: 1, title: 'some' }))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions[0].type).toEqual(actionTypes.DOCUMENT_UPDATE_SUCCESS);
      });
  });
});
