/*global expect, describe, it */
import documentReducers from '../../reducers/documentReducer';
import actionTypes from '../../constants';
import initialState from '../../reducers/initialState';

describe('Admin Reducers', () => {
  it('Should load all user documents successfully', () => {
    const expected = { alldocuments: [{}, {}, {}],
      loaded: true,
      archived: {},
      selectedDocument: {} };
    expect(documentReducers(initialState.manageDocument, {
      type: actionTypes.GET_DOCUMENTS_SUCCESS,
      documents: [{}, {}, {}] })).toEqual(expected);
  });

  it('Should load a single document', () => {
    const expected = { alldocuments: [],
      loaded: false,
      archived: {},
      selectedDocument: { id: 1 } };
    expect(documentReducers(initialState.manageDocument, {
      type: actionTypes.GET_DOCUMENT_SUCCESS,
      document: { id: 1 } })).toEqual(expected);
  });

  it('Should remove deleted document and add it to archived', () => {
    const expected = { alldocuments: [{ id: 2 }, { id: 3 }],
      loaded: true,
      archived: { id: 1 },
      selectedDocument: {},
    };
    const modified = documentReducers(initialState.manageDocument, {
      type: actionTypes.GET_DOCUMENTS_SUCCESS,
      documents: [{ id: 1 }, { id: 2 }, { id: 3 }] });
    expect(documentReducers(modified, {
      type: actionTypes.DOCUMENT_DELETED_SUCCESSFULLY,
      document: { id: 1 },
    })).toEqual(expected);
  });

  it('Should undo deleted document', () => {
    const expected = { alldocuments: [{ id: 1 }, { id: 2 }, { id: 3 }],
      loaded: true,
      archived: {},
      selectedDocument: {},
    };
    const modified = documentReducers(initialState.manageDocument, {
      type: actionTypes.GET_DOCUMENTS_SUCCESS,
      documents: [{ id: 2 }, { id: 3 }] });
    expect(documentReducers(modified, {
      type: actionTypes.UNDO_DELETED_ITEM,
      documents: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })).toEqual(expected);
  });
});
