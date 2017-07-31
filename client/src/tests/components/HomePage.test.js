import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import actionTypes from '../../constants';
import HomePage from '../../components/HomePage.jsx';

TestWrapper.componentName = 'HomePage';
// mock jquery call
global.window.$ = jest.fn(() => {
  return {
    sideNav: jest.fn(),
    tabs: jest.fn(),
    material_select: jest.fn(),
    on: jest.fn(),
  };
});

describe('HomePage component', () => {
  const wrapper = TestWrapper.mounts(HomePage,
    { location: { pathname: '/' } });
  TestWrapper.dispatch({
    type: actionTypes.LOGIN_USER,
    user: {}
  });
  const rendered = TestWrapper.renders(HomePage,
    { location: { pathname: '/' } }).html();

  describe('When user is not logged in', () => {
    it('Should show site description', () => {
      expect(rendered.includes('A modern document management system that does the work perfectly')).toBe(true);
      expect(rendered.includes('Easy Management')).toBe(true);
      expect(rendered.includes('User Experience')).toBe(true);
      expect(rendered.includes('Confidentiality')).toBe(true);
    });

    it('Should show the site name', () => {
      expect(rendered.includes('We Doc')).toBe(true);
    });
  });

  describe('When user is logged in', () => {
    TestWrapper.dispatch({
      type: actionTypes.LOGIN_USER,
      user: { userId: 1, roleId: 1, fullName: 'Eta Jude' }
    });

    const rendered = TestWrapper.renders(HomePage,
    { location: { pathname: '/' } }).html();

    it('Should display the user dasboard', () => {
      expect(wrapper.find('DashBoard').length).toBe(1);
    });

    it('Should show user details', () => {
      expect(rendered.includes('Eta Jude')).toBe(true);
    });

    it('Should display user role', () => {
      expect(rendered.includes('Administrator')).toBe(true);
    });
  });
});
