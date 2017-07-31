/* global describe, it, expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { ManageDocuments } from '../../../components/admin/ManageDocuments';

TestWrapper.componentName = 'ManageDocuments';

const mockFunc = jest.fn();
mockFunc.mockReturnValue(() => Promise.resolve(true));

const mockSearch = jest.fn();
mockFunc.mockReturnValue(() => Promise.resolve(true));

const documents = [{
  id: 2,
  ownerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
},
{
  id: 3,
  ownerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
},
];
const userDetail = {
  userId: 1,
  fullName: 'Jude Admin',
  roleId: 1,
};

const getAllDocuments = mockFunc();

describe('ManageDocuments Component', () => {
  describe('When admin is logged in', () => {
    const wrapper = TestWrapper.mounts(ManageDocuments, {
      documents,
      user: userDetail,
      location: { query: {} },
      getAllDocuments,
      triggerSearch: jest.fn(),
      clearSearch: jest.fn(),
      searchDocuments: jest.fn(() => { return Promise.resolve(true); }),
      deleteDocument: jest.fn(() => { return Promise.resolve(true); }),
    });

    it('Should find document List', () => {
      expect(wrapper.find('DocumentList').length).toBe(1);
    });

    it('Should list all 2 documents', () => {
      expect(wrapper.find('Document').length).toBe(2);
    });

    it('should update document when it change', () => {
      documents.push({
        id: 4,
        title: 'this is andela',
        content: 'some content here',
        ownerId: 1,
        permission: 'public',
      });

      TestWrapper.call().componentWillReceiveProps({ ...TestWrapper.call().state, documents });
      expect(TestWrapper.call().props.documents.length).toBe(3);
      expect(wrapper.find('Document').length).toBe(3);
    });

    it('Should update active pagination when user navigates', () => {
      TestWrapper.call().nextPage(1);
      expect(TestWrapper.call().state.activePagination).toBe(1);
    });

    it('Should update active pagination when user navigates', () => {
      TestWrapper.call().nextPage(3);
      expect(TestWrapper.call().state.activePagination).toBe(1);
    });
  });

  describe('When Searching', () => {
    it('Should call the search document props', () => {
      TestWrapper.call().props.location.query.q = 'book';
      TestWrapper.call().componentDidMount();
      expect(TestWrapper.call().props.searchDocuments).toHaveBeenCalled();
    });

    it('Should get search result count', () => {
      TestWrapper.call().componentWillReceiveProps({ ...TestWrapper.call().state, isSearching: true });
      expect(TestWrapper.call().state.isSearching).toBe(true);
    });
  });

  describe('When admin search document', () => {
    it('Should call the search document props', () => {
      TestWrapper.call().deleteDocument({ id: 1, title: 'some document', content: 'some content' });
      expect(TestWrapper.call().props.deleteDocument).toHaveBeenCalled();
    });
  });
});
