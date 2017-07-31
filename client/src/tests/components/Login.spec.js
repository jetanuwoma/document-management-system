/* global it, expect, jest  describe*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import $ from '../helper/validator';
import Login from '../../components/Login.jsx';

TestWrapper.componentName = 'Login';
const event = { target: { name: '', value: '' }, preventDefault: jest.fn() };

describe('Login component', () => {
  const wrapper = TestWrapper.mounts(Login,
    { location: { pathname: '/' } });

  const rendered = TestWrapper.renders(Login,
    { location: { pathname: '/' } }).html();

  it('should contain a password field', () => {
    expect(rendered.includes('<input type="password" name="password">')).toBe(true);
  });

  it('should contain an email address field', () => {
    expect(rendered.includes('<input type="email" id="email" name="email" class="validate">')).toBe(true);
  });

  it('should update email state when user types', () => {
    event.target.name = 'email';
    event.target.value = 'wapjude@gmail.com';
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.user.email).toBe('wapjude@gmail.com');
  });

  it('should update password state when user insert password', () => {
    event.target.name = 'password';
    event.target.value = 'password1122';
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.user.password).toBe('password1122');
  });
});
