/* global it, expect, jest  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import $ from '../helper/validator';
import SignUp from '../../components/SignUp.jsx';

TestWrapper.componentName = 'SignUp';

describe('SignUp component', () => {
  const wrapper = TestWrapper.mounts(SignUp,
    { location: { pathname: '/' } });

  const rendered = TestWrapper.renders(SignUp,
    { location: { pathname: '/' } }).html();

  const event = { target: { name: '', value: '' }, preventDefault: jest.fn() };


  it('should load form field', () => {
    expect(rendered.includes('<input type="text" name="fullName" id="fullName">')).toBe(true);
  });

  it('should update user state when filling form', () => {
    event.target.name = 'fullName';
    event.target.value = 'Chioma Jude';
    TestWrapper.call().onChange(event);
    event.target.name = 'email';
    event.target.value = 'wapjude@gmail.com';
    TestWrapper.call().onChange({ target: { name: 'email', value: 'wapjude@gmail.com' }, preventDefault: jest.fn() });
    expect(TestWrapper.call().state.user.fullName).toBe('Chioma Jude');
    expect(TestWrapper.call().state.user.email).toBe('wapjude@gmail.com');
  });

  it('should submit when form is submitted with all details', () => {
    const user = { fullName: 'jude', username: 'wapjude', password: 'password', passwordAgain: 'password', email: 'email@aol.com' };
    TestWrapper.call().state.user = user;
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.error.fullName).toBe(undefined);
    expect(TestWrapper.call().state.error.username).toBe(undefined);
    expect(TestWrapper.call().state.error.password).toBe(undefined);
    expect(TestWrapper.call().state.error.email).toBe(undefined);
  });
});
