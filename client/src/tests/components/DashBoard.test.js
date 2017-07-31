/* global jest, it, expect  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import $ from '../helper/validator';
import actionTypes from '../../constants';
import DashBoard from '../../components/DashBoard.jsx';

TestWrapper.componentName = 'DashBoard';

global.window.tinymce = {
  init: jest.fn(),
  get: jest.fn(),
};


const event = {
  target: {
    name: '',
    value: '',
  },
  preventDefault: jest.fn(),
};

describe('DashBoard component', () => {
  const wrapper = TestWrapper.mounts(DashBoard,
    { location: { pathname: '/' } });
  TestWrapper.dispatch({
    type: actionTypes.LOGIN_USER,
    user: { userId: 1, roleId: 1, fullName: 'Eta Jude' },
  });
  const rendered = TestWrapper.renders(DashBoard,
    { location: { pathname: '/' } }).html();

  describe('When user is logged in', () => {
    it('Should show users details', () => {
      expect(rendered.includes('Eta Jude')).toBe(true);
    });

    it('Should show user role', () => {
      expect(rendered.includes('Administrator')).toBe(true);
    });

    it('Should receive all user props', () => {
      expect(TestWrapper.call().props.user.roleId).toBe(1);
      expect(TestWrapper.call().props.user.userId).toBe(1);
      expect(TestWrapper.call().props.user.fullName).toBe('Eta Jude');
    });

    it('Should receive dispatch functions', () => {
      expect(typeof TestWrapper.call().props.saveDocument).toBe('function');
      expect(typeof TestWrapper.call().props.updateProfile).toBe('function');
    });
  });

  describe('When user add document', () => {
    it('Should have default document details', () => {
      expect(TestWrapper.call().state.document.content).toBe('type your content here');
      expect(TestWrapper.call().state.document.title).toBe('');
      expect(TestWrapper.call().state.document.permission).toBe('public');
    });

    it('Should update permission when it changes', () => {
      event.target.name = 'permission';
      event.target.value = 'Private';
      TestWrapper.call().onChange(event);
      expect(TestWrapper.call().state.document.permission).toBe('Private');
    });

    it('Should change title when user add title', () => {
      event.target.name = 'title';
      event.target.value = 'This is my private document';
      TestWrapper.call().onChange(event);
      expect(TestWrapper.call().state.document.title).toBe('This is my private document');
    });

    it('Should update content when it is updated', () => {
      const newValue = 'Some updated content';
      TestWrapper.call().handleEditorChange(newValue);
      expect(TestWrapper.call().state.document.content).toBe('Some updated content');
    });

    it('Should add to document when form is submitted', () => {
      expect(TestWrapper.call().props.alldocuments.alldocuments.length).toBe(0);

      const saveDocument = (document) => {
        TestWrapper.dispatch({
          type: actionTypes.CREATE_DOCUMENT_SUCCESS,
          document,
        });
        return Promise.resolve(() => true);
      };

      TestWrapper.call().state.saveDocument = saveDocument;
      TestWrapper.call().handleSubmit({ preventDefault: () => { } });
      expect(TestWrapper.call().props.alldocuments.alldocuments.length).toBe(1);
    });
  });

  describe('When user update profile', () => {

    it('Should change users fullName state', () => {
      event.target.name = 'fullName';
      event.target.value = 'Etanuwoma Jude';
      TestWrapper.call().onProfileChange(event);
      expect(TestWrapper.call().state.user.fullName).toBe('Etanuwoma Jude');
    });

    it('Should change users email address', () => {
      event.target.name = 'email';
      event.target.value = 'etajuder@gmail.com';
      TestWrapper.call().onProfileChange(event);
      expect(TestWrapper.call().state.user.email).toBe('etajuder@gmail.com');
    });

    it('Should change users password', () => {
      event.target.name = 'password';
      event.target.value = 'password';
      TestWrapper.call().onProfileChange(event);
      expect(TestWrapper.call().state.user.password).toBe('password');
      event.target.name = 'passwordAgain';
      event.target.value = 'password';
      expect(TestWrapper.call().state.user.password).toBe('password');
    });

    it('Should update user profile when form is submitted', () => {
      expect(TestWrapper.call().props.user.fullName).toBe('Eta Jude');
      const updateProfile = () => {
        TestWrapper.dispatch({
          type: actionTypes.USER_RECORD_UPDATED,
          user: { userId: 1, roleId: 1, fullName: 'Eta Change', email: 'chan@aa.s' }
        });
        return Promise.resolve(true);
      };
      TestWrapper.call().state.updateProfile = updateProfile;
      TestWrapper.call().handleProfileSubmit({ preventDefault: () => { } });
      expect(TestWrapper.call().props.user.fullName).toBe('Eta Jude');
    });
  });
});
