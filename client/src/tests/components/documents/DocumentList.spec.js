import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import DocumentList from '../../../components/document/DocumentList.jsx';

TestWrapper.componentName = 'DocumentList';
const documentDetail = [{
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
}
];

const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1
};

const getDocument = () => { return Promise.resolve(true); };

describe('DocumentList Component', () => {
  const wrapper = TestWrapper.mounts(DocumentList, {
    documents: documentDetail,
    user: userDetail,
    getDocument
  });

  it('Should list all 2 documents', () => {
    expect(wrapper.find('Document').length).toBe(2);
  });

  it('Should show total number search result', () => {
    const wrapper = TestWrapper.mounts(DocumentList, {
      documents: documentDetail,
      getDocument,
      user: userDetail,
      isSearching: true,
      searchCount: 2,
    });
    expect(TestWrapper.call().props.searchCount).toBe(2);
  });
});
