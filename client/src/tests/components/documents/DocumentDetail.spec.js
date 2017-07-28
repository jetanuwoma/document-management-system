import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { DocumentDetail } from '../../../components/document/DocumentDetail.jsx';

TestWrapper.componentName = 'DocumentDetail';
const documentDetail = {
  id: 2,
  OwnerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
};

const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1
};

const getDocument = () => { return Promise.resolve(true); };

const params = { id: 1 };
describe('Document Component', () => {
  const wrapper = TestWrapper.mounts(DocumentDetail, {
    user: userDetail,
    params,
    document: documentDetail,
    getDocument
  });
  const rendered = wrapper.render().html();

  it('should show the document title', () => {
    expect(rendered.includes('<h1>The book of mistery</h1>')).toBe(true);
  });

  it('should show the content', () => {
    expect(rendered.includes('<div>The content of mistery</div>')).toBe(true);
  });
});
