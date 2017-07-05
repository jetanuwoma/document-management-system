/* global it, expect  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import actionTypes from '../../constants';
import SideBar from '../../components/templates/SideBar.jsx';

TestWrapper.componentName = 'SideBar';
const mockLocalStorage = {
  getItem: (key) => {
    if (key === 'id_token') { return 'somerandomvalue'; }
    return null;
  },
  removeItem: (key) => {
    return key;
  },
};

global.window.localStorage = mockLocalStorage;

describe('SideBar component', () => {
  const wrapper = TestWrapper.mounts(SideBar,
     { location: { pathname: '/' } });
  TestWrapper.dispatch({
    type: actionTypes.LOGIN_USER,
    user: { UserId: 1, RoleId: 2, fullNames: 'Eta Jude' }
  });
  const rendered = TestWrapper.renders(SideBar,
        { location: { pathname: '/' } }).html();

  describe('When user is not an admin', () => {
    it('Should should display user role as regular', () => {
      expect(rendered.includes('Regular')).toBe(true);
      expect(rendered.includes('Administrator')).toBe(false);
    });

    it('Should display user details', () => {
      expect(rendered.includes('Eta Jude')).toBe(true);
    });

    it('Should display only user accessible link', () => {
      expect(rendered.includes('My Documents')).toBe(true);
      expect(rendered.includes('Manage Users')).toBe(false);
      expect(rendered.includes('Public Documents')).toBe(true);
      expect(rendered.includes('Dashboard')).toBe(true);
    });
  });

  describe('When user is an admin', () => {
    TestWrapper.dispatch({
      type: actionTypes.LOGIN_USER,
      user: { UserId: 1, RoleId: 1, fullNames: 'Eta Jude' },
    });
    const rendered = TestWrapper.renders(SideBar,
        { location: { pathname: '/' } }).html();

    it('Should should display user role as Admin', () => {
      expect(rendered.includes('Regular')).toBe(false);
      expect(rendered.includes('Administrator')).toBe(true);
    });

    it('Should display all admin and regular accessible link', () => {
      expect(rendered.includes('Manage Users')).toBe(true);
      expect(rendered.includes('Public Documents')).toBe(true);
      expect(rendered.includes('Manage Documents')).toBe(true);
      expect(rendered.includes('Dashboard')).toBe(true);
    });
  });

  describe('When logout button is clicked', () => {
    const event = {
      preventDefault: () => { return null; },
    };
    TestWrapper.call().logOut(event);
    const rendered = TestWrapper.renders(SideBar,
        { location: { pathname: '/' } }).html();
    it('should clear user state', () => {
      expect(TestWrapper.call().props.user.fullNames).toBe(undefined);
      expect(rendered.includes('Eta Jude')).toBe(false);
      expect(TestWrapper.call().props.user.UserId).toBe(undefined);
    });
  });
});
