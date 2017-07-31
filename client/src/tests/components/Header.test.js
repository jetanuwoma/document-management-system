/* global it, expect  describe, jest*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import actionTypes from '../../constants';
import Header from '../../components/templates/Header.jsx';

TestWrapper.componentName = 'Header';

describe('Header component', () => {
  describe('When user not logged in', () => {
    const wrapper = TestWrapper.mounts(Header,
      { location: { pathname: '/' } });

    const rendered = TestWrapper.renders(Header,
      { location: { pathname: '/' } }).html();

    it('Should contain a wrapper `div`', () => {
      expect(wrapper.find('div').length).toBe(7);
    });

    it('Should render the site title', () => {
      expect(rendered
        .includes('WeDoc'))
        .toBe(true);
    });

    it('Should show the authentication link', () => {
      expect(
        rendered
          .includes('Sign Up')).toBe(true);
      expect(
        rendered
          .includes('Login')).toBe(true);
    });

    it('Should not display the search input', () => {
      expect(rendered.includes('<input type="text" name="Search" class="header-search-input z-depth-2" placeholder="Search for allDocuments" value="">'))
        .toBe(false);
    });
  });

  describe('When user is logged in', () => {
    TestWrapper.dispatch({
      type: actionTypes.LOGIN_USER,
      user: { userId: 1, roleId: 1, fullName: 'Eta Jude' }
    });

    const triggerSearch = (value, scope) => {
    };
    const props = {
      location: {
        pathname: '/', query: {},
      },
      triggerSearch,
    };

    const wrapper = TestWrapper.mounts(Header, props);
    const rendered = TestWrapper.renders(Header, { location: { pathname: '/' } }).html();

    it('Should display the search input', () => {
      expect(rendered
        .includes(`<input type="text" name="Search" class="header-search-input z-depth-2" placeholder="Search for allDocuments" value="">`))
        .toBe(true);
    });

    it('Should contain a rendered SideBar', () => {
      expect(wrapper.find('SideBar').length).toBe(1);
    });

    it('Should set default search zone to allDocument', () => {
      expect(TestWrapper.call().state.searchSource).toBe('allDocuments');
    });
  });

  describe('When user is searching', () => {
    TestWrapper.call().state.searchDocuments = jest.fn(() => { return Promise.resolve(true); });
    TestWrapper.call().state.searchUsers = jest.fn(() => { return Promise.resolve(true); });
    const fakeOnChageEvent = { target: { value: 'abc' }, keyCode: 2 };
    it('Should change search query', () => {
      expect(TestWrapper.call().state.searchValue).toBe('');
      TestWrapper.call().onSearch(fakeOnChageEvent);
      expect(TestWrapper.call().state.searchValue).toBe('abc');
    });

    it('Should search based on current search source', () => {
      fakeOnChageEvent.keyCode = 13;
      TestWrapper.call().onSearch(fakeOnChageEvent);
      expect(TestWrapper.call().state.searchDocuments).toHaveBeenCalled();
    });

    it('Should search documents when search source is publicDocument', () => {
      TestWrapper.call().componentWillReceiveProps({ searchSource: 'publicDocuments' });
      expect(TestWrapper.call().state.searchSource).toBe('publicDocuments');
      fakeOnChageEvent.keyCode = 13;
      TestWrapper.call().onSearch(fakeOnChageEvent);
      expect(TestWrapper.call().state.searchDocuments).toHaveBeenCalled();
    });

    it('Should search for users when search source is users', () => {
      TestWrapper.call().componentWillReceiveProps({ searchSource: 'users' });
      expect(TestWrapper.call().state.searchSource).toBe('users');
      fakeOnChageEvent.keyCode = 13;
      TestWrapper.call().onSearch(fakeOnChageEvent);
      expect(TestWrapper.call().state.searchUsers).toHaveBeenCalled();
    });
  });
});
