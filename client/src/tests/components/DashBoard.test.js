import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from '../helper/TestWrapper';
import actionTypes from '../../constants';
import DashBoard from '../../components/DashBoard.jsx';

TestWrapper.componentName = 'DashBoard';

global.window.tinymce = {
  init: jest.fn(),
  get: jest.fn(),
};

// mock jquery call
global.window.$ = jest.fn(() => {
  return {
    sideNav: jest.fn(),
    tabs: jest.fn(),
    material_select: jest.fn(),
    on: jest.fn(),
  };
});

describe('DashBoard component', () => {
  const wrapper = TestWrapper.mounts(DashBoard,
    { location: { pathname: '/' } });
  TestWrapper.dispatch({
    type: actionTypes.LOGIN_USER,
    user: { UserId: 1, RoleId: 1, fullNames: 'Eta Jude' }
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
      expect(TestWrapper.call().props.user.RoleId).toBe(1);
      expect(TestWrapper.call().props.user.UserId).toBe(1);
      expect(TestWrapper.call().props.user.fullNames).toBe('Eta Jude');
    });

    it('Should receive dispatch functions', () => {
      expect(typeof TestWrapper.call().props.saveDocument).toBe('function');
      expect(typeof TestWrapper.call().props.updateProfile).toBe('function');
    });
  });

  describe('When user add document', () => {
    it('Should have default document details', () => {
      expect(TestWrapper.call().state.document.content).toBe('some initial content here');
      expect(TestWrapper.call().state.document.title).toBe('');
      expect(TestWrapper.call().state.document.permission).toBe('public');
    });

    it('Should update permission when it changes', () => {
      const event = {
        target: {
          name: 'permission',
          value: 'Private'
        }
      };
      TestWrapper.call().onChange(event);
      expect(TestWrapper.call().state.document.permission).toBe('Private');
    });

    it('Should change title when user add title', () => {
      const event = {
        target: {
          name: 'title',
          value: 'This is my private document'
        }
      };
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
          document
        });
        return Promise.resolve(() => true);
      };

      TestWrapper.call().state.saveDocument = saveDocument;
      TestWrapper.call().handleSubmit({ preventDefault: () => {} });
      expect(TestWrapper.call().props.alldocuments.alldocuments.length).toBe(1);
    });
  });

  describe('When user update profile', () => {
      const event = {
        target: {
          name: 'fullNames',
          value: 'Etanuwoma Jude'
        }
      };
    it('Should chang users Fullnames state', () => {
      TestWrapper.call().onProfileChange(event);
      expect(TestWrapper.call().state.user.fullNames).toBe('Etanuwoma Jude');
    });

    it('Should change users email address', () => {
      const event = {
        target: {
          name: 'email',
          value: 'etajuder@gmail.com'
        }
      };
      TestWrapper.call().onProfileChange(event);
      expect(TestWrapper.call().state.user.email).toBe('etajuder@gmail.com');
    });

   it('Should update user profile when form is submitted', () => {

   });
    const updateProfile = (user) => {
      TestWrapper.dispatch({
        type: actionTypes.USER_RECORD_UPDATED,
        user
      });
      return Promise.resolve(true);
    };

    TestWrapper.call().state.updateProfile = updateProfile;
    TestWrapper.call().handleProfileSubmit({ preventDefault: () => {} });
  });


});
