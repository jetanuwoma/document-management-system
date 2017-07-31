/* global it, expect, jest  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { PublicDocuments } from '../../../components/document/PublicDocuments';

TestWrapper.componentName = 'PublicDocuments';
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

const getPublicDocuments = () => { return Promise.resolve(true); };

describe('PublicDocuments Component', () => {
  const wrapper = TestWrapper.mounts(PublicDocuments, {
    myDocuments: documents,
    user: userDetail,
    location: { query: {} },
    getPublicDocuments,
    triggerSearch: () => true,
    clearSearch: jest.fn(),
    searchDocuments: jest.fn(() => Promise.resolve(true)),
    deleteDocument: jest.fn(() => Promise.resolve(true)),
  });

  it('Should find document List', () => {
    expect(wrapper.find('PublicDocuments').length).toBe(1);
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

    TestWrapper.call().componentWillReceiveProps({ myDocuments: document });
    expect(TestWrapper.call().props.myDocuments.length).toBe(3);
    expect(wrapper.find('Document').length).toBe(3);
  });

  it('Should update active pagination when user navigates', () => {
    TestWrapper.call().nextPage(1);
    expect(TestWrapper.call().state.activePagination).toBe(1);
  });

  it('Should call the delete function when user delete document', () => {
    TestWrapper.call().deleteDocument({});
    expect(TestWrapper.call().props.deleteDocument).toHaveBeenCalled();
  });

  it('Should search for documents when url location contains search query', () => {
    TestWrapper.call().state.location.query.q = 'somesearchterms';
    TestWrapper.call().componentDidMount();
    expect(TestWrapper.call().props.searchDocuments).toHaveBeenCalled();
  });
});
