import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { EditDocument } from '../../../components/document/EditDocument.jsx';

global.window.tinymce = {
  init: jest.fn(),
  get: jest.fn(),
};

TestWrapper.componentName = 'EditDocument';
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

const loadDocument = () => { return Promise.resolve(true); };

describe('EditDocument Component', () => {
  const wrapper = TestWrapper.mounts(EditDocument, {
    document: documents[0],
    user: userDetail,
    params: { id: 1 },
    loadDocument,
  });
  const rendered = wrapper.render().html();

  it('Should render the title input', () => {
    console.log(TestWrapper.call().state);
    expect(rendered.includes('The book of mistery')).toBe(true);
  });
});
