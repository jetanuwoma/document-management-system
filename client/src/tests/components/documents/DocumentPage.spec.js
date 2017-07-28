/* global it, expect  describe, jest*/
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { DocumentPage } from '../../../components/document/DocumentPage.jsx';

TestWrapper.componentName = 'DocumentPage';
const documents = [{
  id: 2,
  OwnerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
},
{
  id: 3,
  OwnerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
},
];
const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1,
};

const getUserDocuments = () => { return Promise.resolve(true).then(); };

describe('DocumentPage Component', () => {
  const wrapper = TestWrapper.mounts(DocumentPage, {
    myDocuments: documents,
    user: userDetail,
    location: { query: {} },
    getUserDocuments,
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
      OwnerId: 1,
      permission: 'public',
    });

    TestWrapper.call().componentWillReceiveProps({ myDocuments: documents });
    expect(TestWrapper.call().props.myDocuments.length).toBe(3);
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

  it('Should search for documents when url location contains search query', () => {
    TestWrapper.call().state.location.query.q = 'somesearchterms';
    TestWrapper.call().componentDidMount();
    expect(TestWrapper.call().props.searchDocuments).toHaveBeenCalled();
  });

  it('Should call the delete function when user delete document', () => {
    TestWrapper.call().deleteDocument({});
    expect(TestWrapper.call().props.deleteDocument).toHaveBeenCalled();
  });
});
