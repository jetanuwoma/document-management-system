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

  it('should load form field', () => {
    expect(rendered.includes('<input type="text" name="fullNames" id="fullNames">')).toBe(true);
  });

  it('should update user state when filling form', () => {
    const event = { target: { name: 'fullNames', value: 'Chioma Jude' } };
    TestWrapper.call().onChange(event);
    expect(TestWrapper.call().state.user.fullNames).toBe('Chioma Jude');
    const eventn = { target: { name: 'email', value: 'wapjude@gmail.com' } };
    TestWrapper.call().onChange(eventn);
    expect(TestWrapper.call().state.user.email).toBe('wapjude@gmail.com');
  });

  it('should prevent null input when form is submitted', () => {
    const user = { fullNames: '', username: '', password: '', passwordAgain: '', email: '' };
    TestWrapper.call().state.user = user;
    TestWrapper.call().processSignUp({ preventDefault: () => true });
    expect(TestWrapper.call().state.error.fullNames).toBe('must not be empty');
    expect(TestWrapper.call().state.error.username).toBe('must not be empty');
    expect(TestWrapper.call().state.error.password).toBe('must not be empty');
    expect(TestWrapper.call().state.error.email).toBe('must not be empty');
  });


  it('should submit when form is submitted with all details', () => {
    const user = { fullNames: 'jude', username: 'wapjude', password: 'password', passwordAgain: 'password', email: 'email@aol.com' };
    TestWrapper.call().state.user = user;
    TestWrapper.call().processSignUp({ preventDefault: () => true });
    TestWrapper.call().userExisting(TestWrapper.call().state.user.email);
    expect(TestWrapper.call().state.error.fullNames).toBe(undefined);
    expect(TestWrapper.call().state.error.username).toBe(undefined);
    expect(TestWrapper.call().state.error.password).toBe(undefined);
    expect(TestWrapper.call().state.error.email).toBe(undefined);
  });
});
