import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper';
import $ from '../helper/validator';
import Login from '../../components/Login.jsx';

TestWrapper.componentName = 'Login';

describe('Login component', () => {
  const wrapper = TestWrapper.mounts(Login,
    { location: { pathname: '/' } });

  const rendered = TestWrapper.renders(Login,
   { location: { pathname: '/' } }).html();

  it('should contain a password field', () => {
    expect(rendered.includes('<input type="password" name="password">')).toBe(true);
  });

  it('should contain an email address field', () => {
    expect(rendered.includes('<input type="email" id="username" name="username" class="validate">')).toBe(true);
  });

  it('should update email state when user types', () => {
    const event = { target: { name: 'username', value: 'wapjude@gmail.com' } };
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.user.username).toBe('wapjude@gmail.com');
  });

  it('should update password state when user insert password', () => {
    const event = { target: { name: 'password', value: 'password1122' } };
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.user.password).toBe('password1122');
  });

  describe('Validation', () => {
    it('should return error when fields are empty', () => {
      TestWrapper.call().state.user.username = '';
      TestWrapper.call().state.user.password = '';
      TestWrapper.call().handleSubmit({ preventDefault: () => {} });
      expect(TestWrapper.call().state.error.username).toBe('must not be empty');
      expect(TestWrapper.call().state.error.password).toBe('must not be empty');
    });

    it('Should submit when user details are inserted', () => {
      TestWrapper.call().state.user.username = 'wapjude@gmail.com';
      TestWrapper.call().state.user.password = 'password';
      TestWrapper.call().handleSubmit({ preventDefault: () => {} });
      expect(TestWrapper.call().state.error.username).toBe(undefined);
    });
  });
});
