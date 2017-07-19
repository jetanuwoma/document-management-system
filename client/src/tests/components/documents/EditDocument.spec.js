/* global describe jest expect it */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { EditDocument } from '../../../components/document/EditDocument';

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
},
];
const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1,
};

const loadDocument = () => Promise.resolve(true);

describe('EditDocument Component', () => {
  const wrapper = TestWrapper.mounts(EditDocument, {
    document: documents[0],
    user: userDetail,
    params: { id: 1 },
    updateDocument: () => Promise.resolve(true),
    loadDocument,
  });
  const rendered = wrapper.render().html();

  it('Should render the title input', () => {
    expect(rendered.includes('input type="text" id="title" name="title" class="validate" value="The book of mistery" required>')).toBe(true);
  });

  it('Should update state when user typed', () => {
    const event = { target: { name: 'title', value: 'the book of mistery edited' } };
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.document.title).toBe('the book of mistery edited');
    event.target.name = 'content';
    event.target.value = 'some content changed';
    TestWrapper.call().handleEditorChange(event.target.value);
    expect(TestWrapper.call().state.document.content).toBe('some content changed');
  });

  it('should allow update', () => {
    expect(TestWrapper.call().handleSubmit({ preventDefault: jest.fn() }));
  });
});
