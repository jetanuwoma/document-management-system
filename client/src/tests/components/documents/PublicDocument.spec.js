/* global it, expect, jest  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import actionType from '../../../constants';
import { PublicDocuments } from '../../../components/document/PublicDocuments.jsx';

TestWrapper.componentName = 'PublicDocuments';
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

const loadPublicDocuments = () => { return Promise.resolve(true); };

describe('PublicDocuments Component', () => {
  const wrapper = TestWrapper.mounts(PublicDocuments, {
    myDocuments: documents,
    user: userDetail,
    location: { query: {} },
    loadPublicDocuments,
    triggerSearch: () => { return true; },
    clearSearch: jest.fn(),
    searchDocuments: (some) => { return Promise.resolve(true); }
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
      OwnerId: 1,
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
});
