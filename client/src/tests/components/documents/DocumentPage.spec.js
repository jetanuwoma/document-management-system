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
}
];
const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1
};

const loadUserDocuments = () => { return Promise.resolve(true); };

describe('DocumentList Component', () => {
  const wrapper = TestWrapper.mounts(DocumentPage, {
    myDocuments: documents,
    user: userDetail,
    location: { query: { } },
    loadUserDocuments,
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
      permission: 'public'
    });

    TestWrapper.call().componentWillReceiveProps({ myDocuments: document });
    expect(TestWrapper.call().props.myDocuments.length).toBe(3);
    expect(wrapper.find('Document').length).toBe(3);
  });

  it('Should update active pagination when user navigates', () => {
    TestWrapper.call().nextPage(1);
    expect(TestWrapper.call().state.activePagination).toBe(1);
    TestWrapper.call().state.isSearching = true;
    TestWrapper.call().nextPage(3);
    expect(TestWrapper.call().state.activePagination).toBe(3);
  });


  describe('When user is searching', () => {
    it('Should detect when user is searching', () => {
      documents.push({
        id: 4,
        title: 'this is andela',
        content: 'some content here',
        OwnerId: 1,
        permission: 'public'
      });
      const wrapper2 = TestWrapper.mounts(DocumentPage, {
        myDocuments: documents,
        user: userDetail,
        location: { query: { q: 'this' } },
        loadUserDocuments,
        isSearching: true,
        triggerSearch: () => {
        }
      });
      TestWrapper.call().nextPage(1);
      expect(TestWrapper.call().props.myDocuments.length).toBe(4);
      expect(wrapper2.render().html().includes('Search Result')).toBe(true);
      expect(wrapper2.find('Document').length).toBe(4);
      expect(TestWrapper.call().state.activePagination).toBe(1);
    });
  });
});
